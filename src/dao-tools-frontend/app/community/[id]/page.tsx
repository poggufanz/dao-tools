"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MessageCircle,
  Plus,
  Bell,
  Share,
  CheckCircle,
  Calendar,
  Shield,
  Heart,
  MessageSquare,
  Vote,
  Clock,
  XCircle,
  MinusCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CommunityProfilePage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [isJoined, setIsJoined] = useState(false)

  // Mock community data
  const community = {
    id: 1,
    name: "DeFi Builders",
    tagline: "Building the future of decentralized finance",
    description:
      "A community of developers, researchers, and enthusiasts working together to advance decentralized finance through innovative protocols, governance mechanisms, and educational initiatives. We focus on creating sustainable and accessible financial tools for everyone.",
    members: 2847,
    category: "DeFi",
    logo: "/placeholder.svg?height=80&width=80&text=DB",
    banner: "/placeholder.svg?height=200&width=800&text=DeFi+Builders+Banner",
    isActive: true,
    founded: "January 2024",
    verified: true,
    stats: {
      proposals: 15,
      posts: 234,
      activeMembers: 1456,
    },
  }

  // Mock feed data
  const feedItems = [
    {
      id: 1,
      type: "post",
      author: "alice.eth",
      avatar: "/placeholder.svg?height=32&width=32&text=AE",
      content:
        "Excited to announce our new liquidity mining program! We're allocating 100,000 tokens over the next 6 months to incentivize participation in our governance protocol. This will help bootstrap liquidity and reward early adopters.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      isLiked: false,
    },
    {
      id: 2,
      type: "proposal",
      title: "Implement New Governance Token Distribution",
      description:
        "Proposal to distribute governance tokens to active community members based on participation metrics and contribution history.",
      author: "bob.dao",
      avatar: "/placeholder.svg?height=32&width=32&text=BD",
      status: "active",
      votes: { yes: 847, no: 123, abstain: 45 },
      totalVotes: 1015,
      timeLeft: "2 days",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "post",
      author: "carol.dev",
      avatar: "/placeholder.svg?height=32&width=32&text=CD",
      content:
        "Just deployed our smart contract audit results. Happy to report zero critical vulnerabilities found! 🎉 Full report available in our documentation. Thanks to the security team for their thorough review.",
      timestamp: "1 day ago",
      likes: 56,
      comments: 12,
      isLiked: true,
    },
  ]

  // Mock proposals data
  const proposals = [
    {
      id: 1,
      title: "Implement New Governance Token Distribution",
      description:
        "Proposal to distribute governance tokens to active community members based on participation metrics.",
      status: "active",
      votes: { yes: 847, no: 123, abstain: 45 },
      totalVotes: 1015,
      timeLeft: "2 days",
      author: "alice.eth",
      category: "Governance",
    },
    {
      id: 2,
      title: "Fund Development of Mobile App",
      description: "Allocate 50,000 USDC from treasury to develop a mobile application for better user experience.",
      status: "active",
      votes: { yes: 1234, no: 567, abstain: 89 },
      totalVotes: 1890,
      timeLeft: "5 days",
      author: "dev.team",
      category: "Development",
    },
    {
      id: 3,
      title: "Partnership with Climate Action Network",
      description:
        "Establish strategic partnership to support environmental initiatives through blockchain technology.",
      status: "passed",
      votes: { yes: 2341, no: 234, abstain: 125 },
      totalVotes: 2700,
      timeLeft: "Ended",
      author: "green.dao",
      category: "Partnership",
    },
  ]

  // Mock members data
  const members = [
    {
      id: 1,
      name: "Alice Johnson",
      username: "alice.eth",
      role: "Admin",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
      votingPower: 1250,
      isOnline: true,
      joinDate: "Jan 2024",
    },
    {
      id: 2,
      name: "Bob Smith",
      username: "bob.dao",
      role: "Moderator",
      avatar: "/placeholder.svg?height=40&width=40&text=BS",
      votingPower: 890,
      isOnline: false,
      joinDate: "Feb 2024",
    },
    {
      id: 3,
      name: "Carol Davis",
      username: "carol.dev",
      role: "Member",
      avatar: "/placeholder.svg?height=40&width=40&text=CD",
      votingPower: 456,
      isOnline: true,
      joinDate: "Mar 2024",
    },
    {
      id: 4,
      name: "David Wilson",
      username: "david.web3",
      role: "Member",
      avatar: "/placeholder.svg?height=40&width=40&text=DW",
      votingPower: 234,
      isOnline: true,
      joinDate: "Mar 2024",
    },
  ]

  const handleJoin = () => {
    setIsJoined(!isJoined)
  }

  const handleLike = (itemId: number) => {
    console.log("Liked item:", itemId)
  }

  const handleVote = (proposalId: number, vote: "yes" | "no" | "abstain") => {
    console.log("Voted on proposal:", proposalId, vote)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "Moderator":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "Member":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "passed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
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
            <span className="text-xl font-bold">OpenVote</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/communities" className="text-muted-foreground hover:text-foreground">
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

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/communities">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Communities
          </Link>
        </Button>
      </div>

      {/* Community Banner */}
      <div className="relative">
        <div
          className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 bg-cover bg-center"
          style={{ backgroundImage: `url(${community.banner})` }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Community Header */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-8">
          <Avatar className="w-24 h-24 ring-4 ring-background">
            <AvatarImage src={community.logo || "/placeholder.svg"} alt={community.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {community.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold text-white">{community.name}</h1>
              {community.verified && <Shield className="w-6 h-6 text-blue-400" />}
            </div>
            <p className="text-lg text-white/90 mb-2">{community.tagline}</p>
            <div className="flex items-center space-x-4 text-white/80">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{community.members.toLocaleString()} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Founded {community.founded}</span>
              </div>
              {community.isActive && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Active</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              asChild
            >
              <Link href={`/chat?community=${community.id}`}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Link>
            </Button>
            <Button size="sm" onClick={handleJoin} className={isJoined ? "bg-green-600 hover:bg-green-700" : ""}>
              {isJoined ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Joined
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Join
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Community Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="proposals">Proposals</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>

              {/* Feed Tab */}
              <TabsContent value="feed" className="space-y-6 mt-6">
                {/* Create Post Button */}
                <Card>
                  <CardContent className="p-4">
                    <Button className="w-full" asChild>
                      <Link href={`/community/${community.id}/create-post`}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Post
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {feedItems.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.author} />
                          <AvatarFallback>{item.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{item.author}</span>
                            <span className="text-sm text-muted-foreground">{item.timestamp}</span>
                          </div>
                          {item.type === "proposal" && (
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                              <Badge variant="outline">Proposal</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {item.type === "post" ? (
                        <>
                          <p className="text-sm mb-4">{item.content}</p>
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(item.id)}
                              className={item.isLiked ? "text-red-500" : ""}
                            >
                              <Heart className={`w-4 h-4 mr-1 ${item.isLiked ? "fill-current" : ""}`} />
                              {item.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {item.comments}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                          {/* Voting Progress */}
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span>Results ({item.totalVotes} votes)</span>
                              <span>{Math.round((item.votes.yes / item.totalVotes) * 100)}% Yes</span>
                            </div>
                            <Progress value={(item.votes.yes / item.totalVotes) * 100} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Yes: {item.votes.yes}</span>
                              <span>No: {item.votes.no}</span>
                              <span>Abstain: {item.votes.abstain}</span>
                            </div>
                          </div>

                          {item.status === "active" && (
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={() => handleVote(item.id, "yes")}>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Yes
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleVote(item.id, "no")}>
                                <XCircle className="w-4 h-4 mr-1" />
                                No
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleVote(item.id, "abstain")}>
                                <MinusCircle className="w-4 h-4 mr-1" />
                                Abstain
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Proposals Tab */}
              <TabsContent value="proposals" className="space-y-6 mt-6">
                {proposals.map((proposal) => (
                  <Card key={proposal.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary" className={getStatusColor(proposal.status)}>
                              {proposal.status}
                            </Badge>
                            <Badge variant="outline">{proposal.category}</Badge>
                          </div>
                          <CardTitle className="text-lg mb-2">{proposal.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>By {proposal.author}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {proposal.timeLeft}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Voting Progress */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Results ({proposal.totalVotes} votes)</span>
                          <span>{Math.round((proposal.votes.yes / proposal.totalVotes) * 100)}% Yes</span>
                        </div>
                        <Progress value={(proposal.votes.yes / proposal.totalVotes) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Yes: {proposal.votes.yes}</span>
                          <span>No: {proposal.votes.no}</span>
                          <span>Abstain: {proposal.votes.abstain}</span>
                        </div>
                      </div>

                      {proposal.status === "active" && (
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleVote(proposal.id, "yes")}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Vote Yes
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleVote(proposal.id, "no")}>
                            <XCircle className="w-4 h-4 mr-1" />
                            Vote No
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleVote(proposal.id, "abstain")}>
                            <MinusCircle className="w-4 h-4 mr-1" />
                            Abstain
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Members Tab */}
              <TabsContent value="members" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {members.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {member.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium truncate">{member.name}</span>
                              <Badge variant="secondary" className={`text-xs ${getRoleColor(member.role)}`}>
                                {member.role}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">@{member.username}</div>
                            <div className="text-xs text-muted-foreground">
                              {member.votingPower} voting power • Joined {member.joinDate}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Info */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{community.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Members</span>
                    <span className="text-sm font-medium">{community.members.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Proposals</span>
                    <span className="text-sm font-medium">{community.stats.proposals}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Posts</span>
                    <span className="text-sm font-medium">{community.stats.posts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Members</span>
                    <span className="text-sm font-medium">{community.stats.activeMembers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" size="sm" asChild>
                  <Link href={`/create-proposal?community=${community.id}`}>
                    <Vote className="w-4 h-4 mr-2" />
                    Create Proposal
                  </Link>
                </Button>
                <Button className="w-full bg-transparent" size="sm" variant="outline" asChild>
                  <Link href={`/community/${community.id}/create-post`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Link>
                </Button>
                <Button className="w-full bg-transparent" size="sm" variant="outline" asChild>
                  <Link href={`/chat?community=${community.id}`}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join Chat
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
