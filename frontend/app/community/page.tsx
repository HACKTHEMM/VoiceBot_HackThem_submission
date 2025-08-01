"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import {
  Users,
  MessageCircle,
  Star,
  Heart,
  Search,
  Filter,
  BookOpen,
  Lightbulb,
  Award,
  TrendingUp,
  Calendar,
  ExternalLink,
  Github,
  Send,
  Globe,
  MapPin,
  Compass
} from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const communityStats = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Active Travelers",
      value: "12,500+",
      description: "Explorers and adventurers worldwide",
      color: "from-[#BBA588] to-[#8E735B]"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Shared Stories",
      value: "3,200+",
      description: "Travel experiences and tips",
      color: "from-[#8E735B] to-[#7C6D64]"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Hidden Gems Uncovered",
      value: "8,900+",
      description: "Community-sourced locations",
      color: "from-[#7C6D64] to-[#BBA588]"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Local Experts",
      value: "450+",
      description: "Verified local guides & experts",
      color: "from-[#BBA588] to-[#8E735B]"
    }
  ]

  const discussionCategories = [
    {
      icon: <Compass className="h-5 w-5" />,
      title: "Getting Started",
      description: "New to Voce? Start your first adventure here",
      posts: 234,
      color: "bg-[#F3F1E9] text-[#8E735B] border-[#BBA588]"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Feature Requests",
      description: "Suggest new languages, cities, and travel features",
      posts: 167,
      color: "bg-[#ECE8D9] text-[#7C6D64] border-[#BBA588]"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Travel Stories",
      description: "Share your journeys and experiences with the world",
      posts: 892,
      color: "bg-[#F3F1E9] text-[#8E735B] border-[#7C6D64]"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Travel Hacks",
      description: "Share tips, tricks, and advice for fellow travelers",
      posts: 456,
      color: "bg-[#ECE8D9] text-[#BBA588] border-[#8E735B]"
    }
  ]

  const featuredTopics = [
    {
      title: "How I Navigated Tokyo's Metro Using Only Voce",
      author: "Alex Carter",
      replies: 23,
      views: 1234,
      lastActivity: "2 hours ago",
      tags: ["japan", "tokyo", "travel-story"],
      featured: true
    },
    {
      title: "My Family's Food Tour of Rome, Guided by Voce",
      author: "Isabella Rossi",
      replies: 45,
      views: 2156,
      lastActivity: "4 hours ago",
      tags: ["italy", "foodie", "family-travel"]
    },
    {
      title: "Found a Hidden Waterfall in Costa Rica Thanks to Voce",
      author: "Maria Garcia",
      replies: 67,
      views: 3421,
      lastActivity: "6 hours ago",
      tags: ["adventure", "costa-rica", "hidden-gem"]
    },
    {
      title: "Best Practices for Using Voce in Low-Connectivity Areas",
      author: "Kenji Tanaka",
      replies: 18,
      views: 845,
      lastActivity: "8 hours ago",
      tags: ["tips", "offline", "tech"]
    },
    {
      title: "Debate: Best Gelato in Florence? Let's Settle This!",
      author: "Community Poll",
      replies: 102,
      views: 4567,
      lastActivity: "12 hours ago",
      tags: ["florence", "debate", "food"]
    }
  ]

  const communityExperts = [
    {
      name: "Isabella Rossi",
      role: "Culinary Guide in Rome",
      contributions: 156,
      expertise: ["Italian Cuisine", "Food Tours", "Local Markets"],
      avatar: "IR"
    },
    {
      name: "Kenji Tanaka",
      role: "Local Fixer in Kyoto",
      contributions: 142,
      expertise: ["Japanese Culture", "Hidden Temples", "Kyoto"],
      avatar: "KT"
    },
    {
      name: "Maria Garcia",
      role: "Adventure Blogger",
      contributions: 138,
      expertise: ["Solo Travel", "South America", "Budget Hacks"],
      avatar: "MG"
    },
    {
      name: "Alex Carter",
      role: "Seasoned Globetrotter",
      contributions: 124,
      expertise: ["Off-the-path", "Travel Safety", "Backpacking"],
      avatar: "AC"
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] dark:from-[#1E1E1E] dark:via-[#2A2A2A] dark:to-[#1E1E1E] transition-all duration-700">
      {/* Classic Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#BBA588]/20 to-[#8E735B]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-[#8E735B]/15 to-[#7C6D64]/15 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#BBA588]/20 to-[#8E735B]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-bl from-[#7C6D64]/10 to-[#BBA588]/10 rounded-full blur-2xl animate-float"></div>
      </div>      {/* Enhanced Navigation */}
      <Navbar />

      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-[#F3F1E9] via-[#ECE8D9] to-[#F3F1E9] text-[#8E735B] border-[#BBA588]/60 dark:from-[#1E1E1E]/80 dark:via-[#2A2A2A]/80 dark:to-[#1E1E1E]/80 dark:text-[#BBA588] dark:border-[#BBA588]/20 px-3 sm:px-4 py-2 text-sm font-medium shadow-md rounded-full font-serif">
              ✈️ Join Our Global Community
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-serif-display">
              <span className="block text-[#2D2C2A] dark:text-[#ECE8D9] mb-2">The Voce</span>
              <span className="block bg-gradient-to-r from-[#8E735B] via-[#BBA588] to-[#7C6D64] bg-clip-text text-transparent">
                Traveler's Hub
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 font-serif">
              Connect with fellow adventurers, share authentic experiences, and get insider tips.
              This is where your next journey begins, with thousands of explorers making travel less foreign.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button asChild size="lg" className="btn-classic text-base sm:text-lg px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                <Link href="https://discord.gg/Voce" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                  Join our Travel Hub
                  <ExternalLink className="h-3 sm:h-4 w-3 sm:w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-classic-outline text-base sm:text-lg px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                <Link href="https://github.com/Voce/community" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                  Developer Corner
                  <ExternalLink className="h-3 sm:h-4 w-3 sm:w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>          {/* Community Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {communityStats.map((stat, index) => (
              <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                <CardContent className="p-4 sm:p-6">
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-lg mb-3 sm:mb-4 text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">
                    {stat.value}
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-[#5A5A5A] dark:text-[#B6B6B6] mb-1 font-serif">
                    {stat.title}
                  </div>
                  <div className="text-sm text-[#7C6D64] dark:text-[#BBA588] font-serif">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>          {/* Search and Categories */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Search */}
              <div className="lg:w-2/3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-[#7C6D64] dark:text-[#BBA588]" />
                  <Input
                    placeholder="Search for destinations, tips, and stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 sm:pl-12 pr-4 py-2 sm:py-3 text-base sm:text-lg bg-[#F3F1E9]/20 dark:bg-[#1E1E1E]/20 backdrop-blur-lg border border-[#BBA588]/30 dark:border-[#BBA588]/20 shadow-lg focus:bg-[#F3F1E9]/30 dark:focus:bg-[#1E1E1E]/30 focus:border-[#8E735B]/50 transition-all duration-300 font-serif"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:w-1/3 flex gap-2 sm:gap-3">
                <Button variant="outline" className="flex-1 bg-[#F3F1E9]/20 dark:bg-[#1E1E1E]/20 backdrop-blur-lg border border-[#BBA588]/30 dark:border-[#BBA588]/20 hover:bg-[#F3F1E9]/30 dark:hover:bg-[#1E1E1E]/30 transition-all duration-300 text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] font-serif">
                  <Filter className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Filter Topics</span>
                </Button>
                <Button className="flex-1 btn-classic shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base font-serif">
                  <Send className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Share a Tip</span>
                  <span className="sm:hidden">Share</span>
                </Button>
              </div>
            </div>
          </div>          {/* Discussion Categories */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 px-4 sm:px-0 font-serif-display">Explore Discussions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {discussionCategories.map((category, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-lg flex items-center justify-center shadow-md`}>
                        {category.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 font-serif-display">
                          {category.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6] mb-3 font-serif">
                          {category.description}
                        </p>
                        <div className="flex items-center text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588]">
                          <MessageCircle className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                          <span className="font-serif">{category.posts} posts</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Featured Topics */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 px-4 sm:px-0 font-serif-display">Featured Stories & Tips</h2>
            <div className="space-y-3 sm:space-y-4">
              {featuredTopics.map((topic, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          {topic.featured && (
                            <Badge className="bg-gradient-to-r from-[#BBA588] to-[#8E735B] text-white border-0 shadow-md w-fit font-serif">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {topic.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588] font-serif">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-2 sm:mb-3 hover:text-[#8E735B] dark:hover:text-[#BBA588] transition-colors leading-tight font-serif-display">
                          {topic.title}
                        </h3>

                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588]">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 sm:h-4 w-3 sm:w-4" />
                            <span className="font-serif">by {topic.author}</span>
                          </div>
                          <div className="flex items-center space-x-4 sm:space-x-6">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span className="font-serif">{topic.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span className="font-serif">{topic.views}</span>
                            </div>
                            <div className="hidden sm:flex items-center space-x-1">
                              <Calendar className="h-3 sm:h-4 w-3 sm:w-4" />
                              <span className="font-serif">{topic.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Community Experts */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-6 sm:mb-8 px-4 sm:px-0 font-serif-display">Community Experts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {communityExperts.map((expert, index) => (
                <Card key={index} className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#BBA588] to-[#8E735B] rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg font-serif-display">
                      {expert.avatar}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-1 font-serif-display">
                      {expert.name}
                    </h3>
                    <p className="text-[#5A5A5A] dark:text-[#B6B6B6] text-xs sm:text-sm mb-2 sm:mb-3 font-serif">
                      {expert.role}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-xs sm:text-sm text-[#7C6D64] dark:text-[#BBA588] mb-3 sm:mb-4">
                      <Award className="h-3 sm:h-4 w-3 sm:w-4" />
                      <span className="font-serif">{expert.contributions} contributions</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {expert.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs bg-[#BBA588]/20 text-[#8E735B] dark:bg-[#BBA588]/30 dark:text-[#BBA588] font-serif">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>          {/* Community Guidelines */}
          <div className="mb-12 sm:mb-16">
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl rounded-2xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-xl sm:text-2xl text-[#2D2C2A] dark:text-[#ECE8D9] font-serif-display">
                  <Heart className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3 text-[#8E735B] dark:text-[#BBA588]" />
                  Our Travel Creed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">Be Respectful</h3>
                    <ul className="space-y-2 text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6]">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-[#8E735B] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-serif">Treat every traveler with kindness and respect</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-[#8E735B] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-serif">Welcome newcomers and help them on their journey</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-[#8E735B] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-serif">Avoid spam, self-promotion, and irrelevant content</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">Share Authentically</h3>
                    <ul className="space-y-2 text-sm sm:text-base text-[#5A5A5A] dark:text-[#B6B6B6]">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-[#BBA588] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-serif">Share your genuine travel experiences and learnings</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-[#BBA588] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-serif">Provide constructive feedback and helpful advice</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-[#BBA588] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="font-serif">Credit others for their tips and contributions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Join CTA */}
          <div className="text-center px-4">
            <Card className="glass-classic border-[#BBA588]/40 dark:border-[#BBA588]/20 shadow-2xl rounded-2xl">
              <CardContent className="p-6 sm:p-8 lg:p-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#BBA588] to-[#8E735B] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <Users className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2C2A] dark:text-[#ECE8D9] mb-3 sm:mb-4 font-serif-display">
                  Ready to Join the Adventure?
                </h2>
                <p className="text-lg sm:text-xl text-[#5A5A5A] dark:text-[#B6B6B6] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-serif">
                  Connect with like-minded explorers, get help with your travel plans, and contribute to a world with fewer barriers and more understanding.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button asChild size="lg" className="btn-classic text-base sm:text-lg px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                    <Link href="https://discord.gg/Voce" target="_blank" rel="noopener noreferrer">
                      Join Our Travel Hub
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="btn-classic-outline text-base sm:text-lg px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-serif">
                    <Link href="https://github.com/Voce/community" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                      Suggest a Feature
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
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