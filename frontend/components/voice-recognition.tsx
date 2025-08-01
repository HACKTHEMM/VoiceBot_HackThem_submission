"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface VoiceRecognitionProps {
  onResult: (text: string) => void
  onListeningChange: (isListening: boolean) => void
  isListening: boolean
  language?: string
  size?: "sm" | "md" | "lg"
  // Add audio control props
  isAudioPlaying?: boolean
  onStopAudio?: () => void
}

export function VoiceRecognition({
  onResult,
  onListeningChange,
  isListening,
  language = "en-US",
  size = "md",
  // Add audio control props with defaults
  isAudioPlaying = false,
  onStopAudio,
}: VoiceRecognitionProps) {
  const [pulseIntensity, setPulseIntensity] = useState(0)
  const [isSupported, setIsSupported] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [errorState, setErrorState] = useState<string | null>(null)

  const recognitionRef = useRef<any>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // Language mapping for speech recognition
  const getLanguageCode = (lang: string) => {
    const languageMap: Record<string, string> = {
      en: "en-US",
      hi: "hi-IN",
      bn: "bn-IN",
      te: "te-IN",
      mr: "mr-IN",
      ta: "ta-IN",
      gu: "gu-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      pa: "pa-IN",
      es: "es-ES",
      fr: "fr-FR",
      de: "de-DE",
    }
    return languageMap[lang] || "en-US"
  }

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = getLanguageCode(language)
      recognition.onstart = () => {
        console.log("Speech recognition started")
        setHasPermission(true)
        setErrorState(null)

        // Set timeout to prevent hanging
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.stop()
            onListeningChange(false)
            toast({
              title: "Voice Timeout",
              description: "No speech detected. Please try again.",
              variant: "default",
            })
          }
        }, 10000) // 10 second timeout
      }
      recognition.onresult = (event: any) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }

        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          }
        }

        if (finalTranscript.trim()) {
          // Stop listening before processing the result
          onListeningChange(false)
          if (recognitionRef.current) {
            recognitionRef.current.stop()
          }

          // Pass the result to parent component
          onResult(finalTranscript.trim())
          setErrorState(null)
        }
      }

      recognition.onerror = (event: any) => {
        const error = event.error;
        console.warn("Speech recognition error:", error);

        // Clear timeout if active
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        // Soft errors: don't toast or stop listening
        const recoverableErrors = ["no-speech", "aborted", "no-match"];
        if (recoverableErrors.includes(error)) {
          console.log(`Recoverable speech error: ${error}`);
          return; // Don't show toast, don't set error state
        }

        // Critical errors: stop recognition, update state
        onListeningChange(false);
        let errorMessage = "Speech recognition error occurred";

        switch (error) {
          case "audio-capture":
            errorMessage = "Microphone not accessible. Please check permissions.";
            setErrorState("microphone-error");
            setHasPermission(false);
            break;
          case "not-allowed":
            errorMessage = "Microphone permission denied. Please allow access.";
            setErrorState("permission-denied");
            setHasPermission(false);
            break;
          case "network":
            errorMessage = "Network error. Please check your connection.";
            setErrorState("network-error");
            break;
          default:
            errorMessage = "Speech recognition failed. Please try again.";
            setErrorState("recognition-error");
        }

        // Show toast only for critical errors
        toast({
          title: "Voice Recognition Error",
          description: errorMessage,
          variant: "destructive",
        });
      };


      recognition.onend = () => {
        console.log("Speech recognition ended")
        onListeningChange(false)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }

        // Only stop listening if not already stopped by error
        onListeningChange(false);
      }

      recognitionRef.current = recognition
    } else {
      setIsSupported(false)
      setErrorState("not-supported")
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [language, onResult, onListeningChange, toast])

  // Handle listening state changes
  useEffect(() => {
    if (isListening && recognitionRef.current && isSupported) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error("Failed to start recognition:", error)
        onListeningChange(false)
        setErrorState("start-failed")
        toast({
          title: "Recording Failed",
          description: "Failed to start voice recording. Please try again.",
          variant: "destructive",
        })
      }
    } else if (!isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        console.error("Error stopping recognition:", error)
      }
    }
  }, [isListening, isSupported, onListeningChange, toast])

  // Pulse animation
  useEffect(() => {
    if (isListening && !errorState) {
      const interval = setInterval(() => {
        setPulseIntensity(Math.random() * 100)
      }, 100)
      return () => clearInterval(interval)
    } else {
      setPulseIntensity(0)
    }
  }, [isListening, errorState])  // Toggle listening state
  const handleToggle = async () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.",
        variant: "destructive",
      })
      return
    }

    if (!isListening) {
      // If audio is playing, stop it first before starting voice input
      if (isAudioPlaying && onStopAudio) {
        console.log("🔇 Stopping TTS audio to start voice input")
        // Stop audio immediately and the parent will update isAudioPlaying state
        onStopAudio()

        // Add a small delay to ensure audio is stopped before starting voice recognition
        setTimeout(() => {
          startVoiceRecognition()
        }, 100)
        return
      }

      // Normal flow when no audio is playing
      startVoiceRecognition()
    } else {
      onListeningChange(false)
    }
  }

  // Separate function for starting voice recognition
  const startVoiceRecognition = async () => {
    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setHasPermission(true)
      setErrorState(null)
      onListeningChange(true)
    } catch (error) {
      console.error("Toggle error:", error)
      setErrorState("permission-denied")
      setHasPermission(false)
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive",
      })
    }
  }

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }
  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }
  const getButtonColor = () => {
    if (errorState) {
      return "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-xl shadow-red-500/30"
    }
    // Prioritize listening state - if listening, always show bronze regardless of audio state
    if (isListening) {
      return "bg-gradient-to-r from-[#BBA588] via-[#8E735B] to-[#7C6D64] hover:from-[#A69479] hover:via-[#7D6652] hover:to-[#6B5E58] shadow-xl shadow-[#BBA588]/40 animate-pulse"
    }
    // Special highlighting when audio is playing to indicate click will interrupt
    if (isAudioPlaying) {
      return "bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 shadow-xl shadow-orange-500/40 animate-pulse"
    }
    return "bg-gradient-to-r from-[#BBA588] via-[#8E735B] to-[#BBA588] hover:from-[#A69479] hover:via-[#7D6652] hover:to-[#A69479] shadow-xl shadow-[#BBA588]/30"
  }

  const getIcon = () => {
    if (errorState) return <AlertCircle className={`${iconSizes[size]} text-white`} />
    if (isListening) return <MicOff className={`${iconSizes[size]} text-white`} />
    return <Mic className={`${iconSizes[size]} text-white`} />
  }
  const getStatusText = () => {
    if (!isSupported) return "Browser not supported"
    if (errorState === "permission-denied") return "Microphone access denied"
    if (errorState === "microphone-error") return "Microphone not accessible"
    if (errorState === "network-error") return "Network error"
    if (errorState === "recognition-error") return "Recognition failed"
    if (errorState === "start-failed") return "Failed to start"
    if (errorState) return "Error occurred"
    if (isAudioPlaying && !isListening) return "Click to interrupt audio"
    return null
  }

  const isDisabled = !isSupported

  return (
    <div className="relative flex items-center justify-center">      {/* Enhanced outer pulse rings - prioritize listening state */}
      {isListening && !errorState && (
        <>
          <div
            className="absolute rounded-full bg-gradient-to-r from-[#BBA588]/20 via-[#8E735B]/20 to-[#7C6D64]/20 animate-ping"
            style={{
              width: `${130 + pulseIntensity * 0.8}%`,
              height: `${130 + pulseIntensity * 0.8}%`,
              animationDuration: "1.2s",
            }}
          />
          <div
            className="absolute rounded-full bg-gradient-to-r from-[#BBA588]/15 via-[#8E735B]/15 to-[#7C6D64]/15 animate-ping"
            style={{
              width: `${160 + pulseIntensity * 0.5}%`,
              height: `${160 + pulseIntensity * 0.5}%`,
              animationDuration: "2s",
            }}
          />
          <div
            className="absolute rounded-full bg-gradient-to-r from-[#BBA588]/10 via-[#8E735B]/10 to-[#7C6D64]/10 animate-ping"
            style={{
              width: `${200 + pulseIntensity * 0.3}%`,
              height: `${200 + pulseIntensity * 0.3}%`,
              animationDuration: "3s",
            }}
          />
        </>
      )}

      {/* Audio interruption indicator rings - only show when audio is playing AND not listening */}
      {isAudioPlaying && !isListening && !errorState && (
        <>
          <div className="absolute rounded-full bg-gradient-to-r from-orange-500/30 via-red-500/30 to-orange-500/30 animate-ping"
            style={{
              width: "140%",
              height: "140%",
              animationDuration: "1.5s",
            }} />
          <div className="absolute rounded-full bg-gradient-to-r from-orange-400/20 via-red-400/20 to-orange-400/20 animate-ping"
            style={{
              width: "180%",
              height: "180%",
              animationDuration: "2.5s",
            }} />
        </>
      )}

      {/* Enhanced main button */}
      <Button
        onClick={handleToggle}
        disabled={isDisabled}
        className={`
          ${sizeClasses[size]} rounded-full relative z-10 transition-all duration-300 border-0
          ${getButtonColor()}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110 active:scale-95"}
          backdrop-blur-sm
        `}
        style={{
          transform: isListening && !errorState ? `scale(${1 + pulseIntensity * 0.002})` : "scale(1)",
        }}
        aria-label={
          isListening
            ? "Stop listening"
            : isAudioPlaying
              ? "Stop audio & start voice input"
              : "Start voice input"
        }
      >
        <div className="relative">
          {getIcon()}
          {isListening && !errorState && (
            <div className="absolute -inset-1 bg-white/20 rounded-full animate-ping"></div>
          )}
        </div>
      </Button>

      {/* Enhanced visual feedback bars */}
      {isListening && !errorState && (
        <div className="absolute -bottom-10 flex space-x-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-[#BBA588] via-[#8E735B] to-[#7C6D64] rounded-full transition-all duration-150"
              style={{
                height: `${6 + pulseIntensity * 0.3 * (Math.random() * 2 + 0.5)}px`,
                opacity: 0.7 + pulseIntensity * 0.003,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Status indicator */}
      {getStatusText() && (
        <div className="absolute -bottom-16 text-xs text-center whitespace-nowrap max-w-48 left-1/2 transform -translate-x-1/2">
          <span
            className={
              errorState
                ? "text-red-400 dark:text-red-400"
                : "text-[#7C6D64] dark:text-[#BBA588]"
            }
          >
            {getStatusText()}
          </span>
        </div>
      )}
    </div>
  )
}
