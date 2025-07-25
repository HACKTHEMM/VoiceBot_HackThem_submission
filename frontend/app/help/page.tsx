"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MessageCircle,
  Book,
  Video,
  FileText,
  Headphones,
  Users,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  ExternalLink,
  Star,
  Clock
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const popularArticles = [
    {
      title: "Getting Started with Voce",
      description: "Complete guide to setting up your first AI conversation",
      category: "Getting Started",
      readTime: "5 min",
      views: "12.5k",
      rating: 4.9
    },
    {
      title: "Voice Commands and Language Support",
      description: "How to use voice features across 10+ Indian languages",
      category: "Voice Features",
      readTime: "8 min",
      views: "9.2k",
      rating: 4.8
    },
    {
      title: "Integrating with Your CRM",
      description: "Step-by-step integration with Salesforce, HubSpot, and more",
      category: "Integrations",
      readTime: "12 min",
      views: "7.8k",
      rating: 4.7
    },
    {
      title: "API Authentication & Rate Limits",
      description: "Understanding API keys, authentication, and usage limits",
      category: "API",
      readTime: "6 min",
      views: "6.4k",
      rating: 4.8
    },
    {
      title: "Managing Team Permissions",
      description: "Set up role-based access control for your team",
      category: "Account Management",
      readTime: "10 min",
      views: "5.1k",
      rating: 4.6
    },
    {
      title: "Troubleshooting Common Issues",
      description: "Quick fixes for the most common problems and errors",
      category: "Troubleshooting",
      readTime: "15 min",
      views: "11.2k",
      rating: 4.9
    }
  ]

  const categories = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Getting Started",
      description: "Basic setup and first steps",
      articleCount: 12,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Voice & Chat Features",
      description: "Using voice and text conversations",
      articleCount: 18,
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Integrations",
      description: "Connect with your existing tools",
      articleCount: 25,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "API Documentation",
      description: "Developer guides and references",
      articleCount: 32,
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security & Privacy",
      description: "Data protection and compliance",
      articleCount: 8,
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Account Management",
      description: "Billing, teams, and settings",
      articleCount: 15,
      color: "from-indigo-500 to-blue-500"
    }
  ]

  const supportOptions = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      action: "Start Chat",
      href: "/chat"
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      availability: "50+ Videos",
      action: "Watch Now",
      href: "#tutorials"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Forum",
      description: "Connect with other Voce users",
      availability: "5k+ Members",
      action: "Join Forum",
      href: "#community"
    }
  ]

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-500">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-[#8E735B]/15 to-[#7C6D64]/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#BBA588]/20 to-[#7C6D64]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-bl from-[#8E735B]/10 to-[#BBA588]/10 rounded-full blur-2xl animate-float"></div>
      </div>

      <Navbar />      <div className="relative pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-[#F3F1E9] to-[#ECE8D9] text-[#8E735B] border-[#BBA588]/50 dark:from-[#1E1E1E]/80 dark:to-[#2A2A2A]/80 dark:text-[#BBA588] dark:border-[#BBA588]/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium shadow-md font-serif">
              💡 Support Center
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 sm:mb-2">Help</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
                Center
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0 font-serif">
              Find answers, guides, and resources to help you get the most out of Voce
            </p>

            {/* Search Bar */}
            <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-0">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-[#7C6D64] dark:text-[#BBA588] h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg w-full font-serif"
                />
              </div>
            </div>
          </div>          {/* Support Options */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 text-center px-2 sm:px-0 font-serif-display">
              Get Help Now
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
              {supportOptions.map((option, index) => (
                <Card
                  key={index}
                  className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#8E735B] to-[#BBA588] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
                        {option.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                      {option.title}
                    </h3>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-3 sm:mb-4 text-xs sm:text-sm font-serif">
                      {option.description}
                    </p>
                    <Badge variant="outline" className="mb-4 sm:mb-6 text-xs border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
                      {option.availability}
                    </Badge>
                    <Link href={option.href}>
                      <Button className="w-full btn-classic text-sm sm:text-base">
                        {option.action}
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Categories */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 text-center px-2 sm:px-0 font-serif-display">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-0">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#8E735B] to-[#BBA588] rounded-lg sm:rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-5 h-5 sm:w-6 sm:h-6">
                          {category.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] truncate font-serif-display">
                          {category.title}
                        </h3>
                        <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm line-clamp-2 font-serif">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
                        {category.articleCount} articles
                      </Badge>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#7C6D64] dark:text-[#BBA588] group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Popular Articles */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 text-center px-2 sm:px-0 font-serif-display">
              {searchQuery ? `Search Results (${filteredArticles.length})` : 'Popular Articles'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
              {filteredArticles.map((article, index) => (
                <Card
                  key={index}
                  className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <Badge variant="outline" className="text-xs flex-shrink-0 border-[#BBA588]/40 text-[#8E735B] dark:text-[#BBA588]">
                        {article.category}
                      </Badge>
                      <div className="flex items-center space-x-1 sm:space-x-2 text-xs text-[#7C6D64] dark:text-[#BBA588] flex-shrink-0 ml-2">
                        <Star className="h-3 w-3 fill-[#BBA588] text-[#BBA588]" />
                        <span>{article.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors line-clamp-2 font-serif-display">
                      {article.title}
                    </h3>

                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 font-serif">
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#7C6D64] dark:text-[#BBA588]">
                      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate font-serif">{article.readTime}</span>
                        </div>
                        <span className="truncate font-serif">{article.views} views</span>
                      </div>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:text-[#8E735B] dark:group-hover:text-[#BBA588] transition-colors flex-shrink-0 ml-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredArticles.length === 0 && searchQuery && (
              <div className="text-center py-8 sm:py-12 px-4 sm:px-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#ECE8D9] dark:bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Search className="h-6 w-6 sm:h-8 sm:w-8 text-[#7C6D64] dark:text-[#BBA588]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                  No articles found
                </h3>
                <p className="text-[#5A5A5A] dark:text-[#B6B6B6] mb-4 sm:mb-6 text-sm sm:text-base px-2 sm:px-0 font-serif">
                  Try adjusting your search terms or browse our categories above
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")} className="text-sm sm:text-base btn-classic-outline">
                  Clear Search
                </Button>
              </div>
            )}
          </div>          {/* Contact Support */}
          <div className="text-center px-2 sm:px-0">
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#8E735B] to-[#BBA588] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Headphones className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                  Still Need Help?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 sm:mb-8 max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto font-serif">
                  Our support team is here to help you succeed. Get personalized assistance from our experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
                  <Link href="/contact" className="flex-1 sm:flex-none">
                    <Button size="lg" className="w-full sm:w-auto btn-classic text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/chat" className="flex-1 sm:flex-none">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto btn-classic-outline text-sm sm:text-base backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Try Live Chat <ExternalLink className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
