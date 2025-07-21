"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, TrendingUp, Clock, Plus, Filter, Bell, UserPlus, Eye, Star, Globe } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CommunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for communities
  const communities = [
    {
      id: 1,
      name: "DeFi Builders",
      description: "Building the future of decentralized finance with innovative protocols and governance mechanisms",
      members: 2847,
      category: "DeFi",
      logo: "/placeholder.svg?height=48&width=48&text=DB",
      isActive: true,
      growth: "+12%",
      lastActivity: "2 hours ago",
      isJoined: false,
      featured: true,
      proposals: 15,
      posts: 234,
    },
    {
      id: 2,
      name: "University DAO",
      description: "Student governance and academic decision making for the digital age",
      members: 856,
      category: "Education",
      logo: "/placeholder.svg?height=48&width=48&text=UD",
      isActive: true,
      growth: "+8%",
      lastActivity: "1 hour ago",
      isJoined: true,
      featured: false,
      proposals: 8,
      posts: 156,
    },
    {
      id: 3,
      name: "Climate Action DAO",
      description: "Global environmental initiatives and carbon offset projects through blockchain technology",
      members: 3421,
      category: "Environment",
      logo: "/placeholder.svg?height=48&width=48&text=CA",
      isActive: true,
      growth: "+15%",
      lastActivity: "30 minutes ago",
      isJoined: false,
      featured: true,
      proposals: 22,
      posts: 445,
    },
    {
      id: 4,
      name: "Developer Collective",
      description: "Web3 developers building the decentralized future together",
      members: 1234,
      category: "Tech",
      logo: "/placeholder.svg?height=48&width=48&text=DC",
      isActive: true,
      growth: "+5%",
      lastActivity: "4 hours ago",
      isJoined: true,
      featured: false,
      proposals: 12,
      posts: 289,
    },
    {
      id: 5,
      name: "Art & NFT Creators",
      description: "Digital artists and NFT creators collaborating on innovative projects",
      members: 967,
      category: "Art",
      logo: "/placeholder.svg?height=48&width=48&text=AC",
      isActive: false,
      growth: "+3%",
      lastActivity: "1 day ago",
      isJoined: false,
      featured: false,
      proposals: 6,
      posts: 178,
    },
    {
      id: 6,
      name: "Gaming DAO",
      description: "Decentralized gaming community focused on play-to-earn and GameFi",
      members: 1876,
      category: "Gaming",
      logo: "/placeholder.svg?height=48&width=48&text=GD",
      isActive: true,
      growth: "+20%",
      lastActivity: "1 hour ago",
      isJoined: false,
      featured: true,
      proposals: 18,
      posts: 367,
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      DeFi: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      Education: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      Environment: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
      Tech: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
      Art: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
      Gaming: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  }

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.category.toLowerCase().includes(searchQuery.toLowerCase())

    switch (activeTab) {
      case "joined":
        return matchesSearch && community.isJoined
      case "trending":
        return matchesSearch && community.featured
      case "active":
        return matchesSearch && community.isActive
      default:
        return matchesSearch
    }
  })

  const handleJoinCommunity = (communityId: number) => {
    console.log("Joining community:", communityId)
  }

  return (

    <div className="min-h-screen bg-background">
      {/* Header */}


      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">DT</span>
            </div>
            <span className="text-xl font-bold">DAO Tools</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/communities" className="text-foreground font-medium">
              Communities
            </Link>
            <Link href="/create-proposal" className="text-muted-foreground hover:text-foreground">
              Create
            </Link>
            <Link href="/chat" className="text-muted-foreground hover:text-foreground">
              Chat
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/notifications">
                <Bell className="w-4 h-4" />
              </Link>
            </Button>
            <ThemeToggle />
            <Avatar className="w-8 h-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Directory</h1>
            <p className="text-muted-foreground">Discover and join communities that match your interests</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" asChild>
              <Link href="/create-community">
                <Plus className="w-4 h-4 mr-2" />
                Create Community
              </Link>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search communities by name, description, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Community Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="joined">Joined</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <Card
                  key={community.id}
                  className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12 ring-2 ring-border/20">
                          <AvatarImage src={community.logo || "/placeholder.svg"} alt={community.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {community.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <CardTitle className="text-lg truncate">{community.name}</CardTitle>
                            {community.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          </div>
                          <Badge variant="secondary" className={`text-xs ${getCategoryColor(community.category)}`}>
                            {community.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed line-clamp-2">
                      {community.description}
                    </CardDescription>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{community.members.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-medium">{community.growth}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{community.proposals} proposals</div>
                      <div className="text-xs text-muted-foreground">{community.posts} posts</div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Active {community.lastActivity}</span>
                      </div>
                      {community.isActive && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span>Live</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                        <Link href={`/community/${community.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      {community.isJoined ? (
                        <Button size="sm" variant="secondary" className="flex-1" disabled>
                          <Users className="w-4 h-4 mr-1" />
                          Joined
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1" onClick={() => handleJoinCommunity(community.id)}>
                          <UserPlus className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCommunities.length === 0 && (
              <div className="text-center py-12">
                <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No communities found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or browse different categories</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Communities</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communities.length}</div>
              <p className="text-xs text-muted-foreground">+2 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Communities</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communities.filter((c) => c.isJoined).length}</div>
              <p className="text-xs text-muted-foreground">Joined</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communities.filter((c) => c.isActive).length}</div>
              <p className="text-xs text-muted-foreground">Communities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {communities.reduce((sum, c) => sum + c.members, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Across all communities</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
