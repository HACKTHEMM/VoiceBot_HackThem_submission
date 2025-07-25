import time
import chromadb
import uuid
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
from datetime import datetime
from typing import List, Optional, Dict, Any
import os

load_dotenv()

class SharedEmbeddingManager:
    """Singleton to manage shared embedding model across all RAG components"""
    _instance = None
    _embedding_model_instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def get_embedding_model(self, model_name: str = 'jinaai/jina-embeddings-v3'):
        if self._embedding_model_instance is None:
            print(f"Loading shared embedding model: {model_name}...")
            try:
                # Create the EmbeddingModel instance once
                self._embedding_model_instance = EmbeddingModel(model_name)
                # Load the model
                if self._embedding_model_instance.load_model():
                    print("✓ Shared embedding model loaded successfully!")
                else:
                    print("✗ Failed to load shared embedding model")
                    self._embedding_model_instance = None
                    return None
            except Exception as e:
                print(f"✗ Error loading shared embedding model: {e}")
                self._embedding_model_instance = None
                return None
        else:
            print("✓ Using existing shared embedding model")
        return self._embedding_model_instance


class EmbeddingModel:
    
    def __init__(self, model_name: str = 'jinaai/jina-embeddings-v3'):
        self.model_name = model_name
        self.model = None
        
    def load_model(self) -> bool:
        try:
            print(f"Loading embedding model: {self.model_name}...")
            self.model = SentenceTransformer(self.model_name, trust_remote_code=True)
            print("Model loaded successfully!")
            return True
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            return False
    
    def generate_embedding(self, text: str) -> Optional[List[float]]:
        if not self.model:
            raise ValueError("Model not loaded. Call load_model() first.")
            
        try:
            embedding = self.model.encode(str(text), convert_to_tensor=False).tolist()
            return embedding if embedding else None
        except Exception as e:
            print(f"Error generating embedding: {str(e)}")
            return None


class ChromaDBManager:
    
    def __init__(self, persist_directory: str = "chromadb_storage"):
        self.persist_directory = persist_directory
        self.client = None
        self.collection = None
        
        # Ensure directory exists
        os.makedirs(self.persist_directory, exist_ok=True)
        
    def initialize_client(self) -> bool:
        try:
            self.client = chromadb.PersistentClient(path=self.persist_directory)
            print(f"ChromaDB client initialized with storage: {self.persist_directory}")
            return True
        except Exception as e:
            print(f"Error initializing ChromaDB client: {str(e)}")
            return False
    
    def get_or_create_collection(self, collection_name: str):
        if not self.client:
            raise ValueError("Client not initialized. Call initialize_client() first.")
            
        try:
            self.collection = self.client.get_collection(name=collection_name)
            print(f"Using existing collection: {collection_name}")
        except:
            self.collection = self.client.create_collection(name=collection_name)
            print(f"Created new collection: {collection_name}")
            
        return self.collection
    
    def add_embeddings(self, documents: List[str], embeddings: List[List[float]], 
                      ids: List[str], metadatas: List[Dict[str, Any]] = None) -> bool:
        if not self.collection:
            raise ValueError("Collection not initialized. Call get_or_create_collection() first.")
            
        try:
            print(f"Storing {len(embeddings)} embeddings in ChromaDB...")
            self.collection.add(
                documents=documents,
                embeddings=embeddings,
                ids=ids,
                metadatas=metadatas or [{}] * len(documents)
            )
            print(f"Successfully stored {len(embeddings)} embeddings")
            return True
        except Exception as e:
            print(f"Error storing embeddings: {str(e)}")
            return False
    
    def get_collection_count(self) -> int:
        if not self.collection:
            raise ValueError("Collection not initialized.")
            
        return self.collection.count()
    
    def search_similar(self, query_embedding: List[float], n_results: int = 5) -> Dict[str, Any]:
        if not self.collection:
            raise ValueError("Collection not initialized.")
            
        try:
            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=n_results
            )
            return results
        except Exception as e:
            print(f"Error searching for similar embeddings: {str(e)}")
            return {"documents": [], "distances": [], "ids": [], "metadatas": []}


class UserInputProcessor:
    
    def __init__(self, collection_name: str = "user_inputs",
                 persist_directory: str = "chromadb_storage",
                 model_name: str = 'jinaai/jina-embeddings-v3'):
        self.collection_name = collection_name
        self.embedding_model = EmbeddingModel(model_name)
        self.chromadb_manager = ChromaDBManager(persist_directory)
        self.is_initialized = False
        
    def initialize(self) -> bool:
        if self.is_initialized:
            return True
            
        if not self.embedding_model.load_model():
            return False
            
        if not self.chromadb_manager.initialize_client():
            return False
            
        self.chromadb_manager.get_or_create_collection(self.collection_name)
        self.is_initialized = True
        return True
    
    def process_single_input(self, text: str, metadata: Dict[str, Any] = None) -> bool:
        if not self.is_initialized:
            if not self.initialize():
                return False
                
        try:
            embedding = self.embedding_model.generate_embedding(text)
            if not embedding:
                return False
                
            timestamp = datetime.now().isoformat()
            input_id = f"input_{str(uuid.uuid4())[:8]}_{int(time.time())}"
            
            final_metadata = {
                "timestamp": timestamp,
                "type": "user_input"
            }
            if metadata:
                final_metadata.update(metadata)
            
            return self.chromadb_manager.add_embeddings(
                documents=[text],
                embeddings=[embedding],
                ids=[input_id],
                metadatas=[final_metadata]
            )
            
        except Exception as e:
            print(f"Error processing user input: {str(e)}")
            return False
    
    def process_batch_inputs(self, texts: List[str], metadata_list: List[Dict[str, Any]] = None) -> int:
        if not self.is_initialized:
            if not self.initialize():
                return 0
                
        successful_count = 0
        for i, text in enumerate(texts):
            metadata = metadata_list[i] if metadata_list and i < len(metadata_list) else None
            if self.process_single_input(text, metadata):
                successful_count += 1
                
        return successful_count
    
    def search_similar_inputs(self, query: str, n_results: int = 5) -> List[Dict[str, Any]]:
        if not self.is_initialized:
            if not self.initialize():
                return []
                
        try:
            query_embedding = self.embedding_model.generate_embedding(query)
            if not query_embedding:
                return []
                
            results = self.chromadb_manager.search_similar(query_embedding, n_results)
            
            similar_inputs = []
            if results and "documents" in results and results["documents"]:
                for i in range(len(results["documents"][0])):
                    similar_input = {
                        "text": results["documents"][0][i],
                        "distance": results["distances"][0][i] if "distances" in results else 0,
                        "id": results["ids"][0][i] if "ids" in results else "",
                        "metadata": results["metadatas"][0][i] if "metadatas" in results else {}
                    }
                    similar_inputs.append(similar_input)
                    
            return similar_inputs
            
        except Exception as e:
            print(f"Error searching similar inputs: {str(e)}")
            return []


class ConversationEmbeddingManager:
    
    def __init__(self, collection_name: str = "conversation_context",
                 persist_directory: str = "chromadb_storage",
                 model_name: str = 'jinaai/jina-embeddings-v3'):
        self.collection_name = collection_name
        self.model_name = model_name
        # CHANGE THIS LINE - Use shared embedding manager
        self.shared_embedding_manager = SharedEmbeddingManager()
        self.embedding_model = None  # Will be set in initialize()
        self.chromadb_manager = ChromaDBManager(persist_directory)
        self.is_initialized = False
        
    def initialize(self) -> bool:
        if self.is_initialized:
            return True
        
        # CHANGE THIS SECTION - Get shared embedding model
        self.embedding_model = self.shared_embedding_manager.get_embedding_model(self.model_name)
        if not self.embedding_model:
            return False
            
        if not self.chromadb_manager.initialize_client():
            return False
            
        self.chromadb_manager.get_or_create_collection(self.collection_name)
        self.is_initialized = True
        return True
    
    def add_user_input(self, user_input: str, conversation_id: str = None) -> Optional[str]:
        if not self.is_initialized:
            if not self.initialize():
                return None
                
        try:
            embedding = self.embedding_model.generate_embedding(user_input)
            if not embedding:
                return None
                
            timestamp = datetime.now().isoformat()
            conv_id = conversation_id or str(uuid.uuid4())
            input_id = f"user_{conv_id}_{int(time.time())}"
            
            success = self.chromadb_manager.add_embeddings(
                documents=[user_input],
                embeddings=[embedding],
                ids=[input_id],
                metadatas=[{
                    "type": "user_input",
                    "conversation_id": conv_id,
                    "timestamp": timestamp
                }]
            )
            
            return input_id if success else None
            
        except Exception as e:
            print(f"Error adding user input: {str(e)}")
            return None
    
    def add_assistant_response(self, assistant_response: str, conversation_id: str = None) -> Optional[str]:
        if not self.is_initialized:
            if not self.initialize():
                return None
                
        try:
            embedding = self.embedding_model.generate_embedding(assistant_response)
            if not embedding:
                return None
                
            timestamp = datetime.now().isoformat()
            conv_id = conversation_id or str(uuid.uuid4())
            response_id = f"assistant_{conv_id}_{int(time.time())}"
            
            success = self.chromadb_manager.add_embeddings(
                documents=[assistant_response],
                embeddings=[embedding],
                ids=[response_id],
                metadatas=[{
                    "type": "assistant_response",
                    "conversation_id": conv_id,
                    "timestamp": timestamp
                }]
            )
            
            return response_id if success else None
            
        except Exception as e:
            print(f"Error adding assistant response: {str(e)}")
            return None
    
    def get_relevant_context(self, query: str, n_results: int = 5) -> List[Dict[str, Any]]:
        if not self.is_initialized:
            if not self.initialize():
                return []
                
        try:
            query_embedding = self.embedding_model.generate_embedding(query)
            if not query_embedding:
                return []
                
            results = self.chromadb_manager.search_similar(query_embedding, n_results)
            
            context_items = []
            if results and "documents" in results and results["documents"]:
                for i in range(len(results["documents"][0])):
                    context_item = {
                        "text": results["documents"][0][i],
                        "distance": results["distances"][0][i] if "distances" in results else 0,
                        "id": results["ids"][0][i] if "ids" in results else "",
                        "metadata": results["metadatas"][0][i] if "metadatas" in results else {}
                    }
                    context_items.append(context_item)
                    
            return context_items
            
        except Exception as e:
            print(f"Error getting relevant context: {str(e)}")
            return []

class EmbeddingRAGPipeline:
    
    def __init__(self, collection_name: str = "rag_collection",
                 persist_directory: str = "chromadb_storage", 
                 model_name: str = 'jinaai/jina-embeddings-v3'):
        self.collection_name = collection_name
        self.persist_directory = persist_directory
        self.model_name = model_name
        # CHANGE THIS SECTION - Use shared embedding manager
        self.shared_embedding_manager = SharedEmbeddingManager()
        self.user_input_processor = None  # Will be created with shared model
        self.is_initialized = False
        
    def initialize(self) -> bool:
        """Initialize the pipeline"""
        if self.is_initialized:
            return True
        
        # CHANGE THIS SECTION - Get shared embedding model and pass to processor
        shared_embedding_model = self.shared_embedding_manager.get_embedding_model(self.model_name)
        if not shared_embedding_model:
            return False
            
        # Create UserInputProcessor with shared embedding model
        # You'll need to modify UserInputProcessor to accept a pre-loaded embedding model
        self.user_input_processor = UserInputProcessor(
            self.collection_name, 
            self.persist_directory, 
            self.model_name,
            shared_embedding_model=shared_embedding_model  # Pass the shared model
        )
        
        self.is_initialized = self.user_input_processor.initialize()
        return self.is_initialized
            
    def run_user_input_pipeline(self, user_inputs: List[str], metadata_list: List[Dict[str, Any]] = None) -> bool:
        print(f"Starting user input embedding generation for {len(user_inputs)} inputs...")
        start_time = time.time()
        
        successful_count = self.user_input_processor.process_batch_inputs(user_inputs, metadata_list)
        
        end_time = time.time()
        elapsed_time = end_time - start_time
        
        print(f"\n{'='*50}")
        print(f"EXECUTION SUMMARY:")
        print(f"{'='*50}")
        print(f"Total inputs processed: {len(user_inputs)}")
        print(f"Embeddings generated: {successful_count}")
        print(f"Total execution time: {elapsed_time:.4f} seconds")
        if len(user_inputs) > 0:
            print(f"Average time per input: {elapsed_time/len(user_inputs):.4f} seconds")
        print(f"{'='*50}")
        
        return successful_count > 0
    
    def add_single_input(self, text: str, metadata: Dict[str, Any] = None) -> bool:
        return self.user_input_processor.process_single_input(text, metadata)
    
    def search_similar(self, query: str, n_results: int = 5) -> List[Dict[str, Any]]:
        return self.user_input_processor.search_similar_inputs(query, n_results)


# REST OF YOUR CONVENIENCE FUNCTIONS REMAIN THE SAME
def process_user_inputs(user_inputs: List[str], collection_name: str = "user_inputs",
                       metadata_list: List[Dict[str, Any]] = None) -> bool:
    pipeline = EmbeddingRAGPipeline(collection_name=collection_name)
    return pipeline.run_user_input_pipeline(user_inputs, metadata_list)


def add_single_user_input(text: str, collection_name: str = "user_inputs",
                         metadata: Dict[str, Any] = None) -> bool:
    pipeline = EmbeddingRAGPipeline(collection_name=collection_name)
    return pipeline.add_single_input(text, metadata)


def search_similar_texts(query: str, collection_name: str = "user_inputs",
                        n_results: int = 5) -> List[Dict[str, Any]]:
    pipeline = EmbeddingRAGPipeline(collection_name=collection_name)
    return pipeline.search_similar(query, n_results)


def create_conversation_manager(collection_name: str = "conversation_context") -> ConversationEmbeddingManager:
    return ConversationEmbeddingManager(collection_name=collection_name)