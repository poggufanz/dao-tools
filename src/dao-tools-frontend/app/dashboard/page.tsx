"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bell,
  Vote,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  FileText,
  MessageCircle,
  Heart,
  UserPlus,
  Settings,
  X,
  ExternalLink,
  Calendar,
  Shield,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardPage() {
  const [userHasRequiredNFT, setUserHasRequiredNFT] = useState(true) // Set to false to test NFT requirement
  const [selectedVoteDetails, setSelectedVoteDetails] = useState<any>(null)
  const [selectedProposalDetails, setSelectedProposalDetails] = useState<any>(null)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "proposal",
      title: "New proposal in DeFi Builders",
      description: "Implement New Governance Token Distribution",
      author: "alice.eth",
      timestamp: "2 hours ago",
      isRead: false,
      community: "DeFi Builders",
      action: "Vote now",
      priority: "high",
    },
    {
      id: 2,
      type: "comment",
      title: "New comment on your post",
      description: "bob.dao commented: 'Great insights on the liquidity mining program!'",
      author: "bob.dao",
      timestamp: "4 hours ago",
      isRead: false,
      community: "DeFi Builders",
      action: "View comment",
      priority: "medium",
    },
    {
      id: 3,
      type: "member",
      title: "New member joined University DAO",
      description: "carol.student has joined the community",
      author: "carol.student",
      timestamp: "6 hours ago",
      isRead: true,
      community: "University DAO",
      action: "Welcome",
      priority: "low",
    },
    {
      id: 4,
      type: "vote",
      title: "Proposal voting ended",
      description: "Fund Development of Mobile App - Proposal passed with 65% approval",
      author: "System",
      timestamp: "1 day ago",
      isRead: true,
      community: "DeFi Builders",
      action: "View results",
      priority: "medium",
    },
    {
      id: 5,
      type: "like",
      title: "Your post received likes",
      description: "5 members liked your post about smart contract security",
      author: "Multiple users",
      timestamp: "1 day ago",
      isRead: true,
      community: "Developer Collective",
      action: "View post",
      priority: "low",
    },
  ])

  // Mock data for communities
  const userCommunities = [
    {
      id: 1,
      name: "DeFi Builders",
      members: 1234,
      avatar: "/placeholder.svg?height=40&width=40&text=DB",
      unreadCount: 3,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "University DAO",
      members: 567,
      avatar: "/placeholder.svg?height=40&width=40&text=UD",
      unreadCount: 0,
      lastActivity: "1 day ago",
    },
    {
      id: 3,
      name: "Developer Collective",
      members: 890,
      avatar: "/placeholder.svg?height=40&width=40&text=DC",
      unreadCount: 1,
      lastActivity: "5 hours ago",
    },
    {
      id: 4,
      name: "Green Energy DAO",
      members: 445,
      avatar: "/placeholder.svg?height=40&width=40&text=GE",
      unreadCount: 0,
      lastActivity: "3 days ago",
    },
  ]

  // Mock data for active votes
  const activeVotes = [
    {
      id: 1,
      title: "Implement New Governance Token Distribution",
      community: "DeFi Builders",
      timeLeft: "2 days left",
      participation: 65,
      status: "active",
      type: "single-choice",
      description:
        "This proposal aims to implement a new governance token distribution mechanism that will better align incentives between token holders and the protocol's long-term success.",
      options: [
        { id: 1, text: "Approve the new distribution model", votes: 450, percentage: 65 },
        { id: 2, text: "Reject and maintain current system", votes: 242, percentage: 35 },
      ],
      settings: {
        votingMethod: "Single Choice",
        deadline: "March 15, 2024 at 11:59 PM UTC",
        eligibility: "DAO Governance Pass NFT holders",
        quorum: "20% of NFT holders",
        privacy: "Public voting",
        nftRequired: true,
        nftContract: "0x1234...abcd",
      },
      totalVotes: 692,
      quorumRequired: 1000,
    },
    {
      id: 2,
      title: "Fund Development of Mobile App",
      community: "University DAO",
      timeLeft: "5 days left",
      participation: 42,
      status: "active",
      type: "yes-no",
      description:
        "Proposal to allocate $50,000 from the treasury to develop a mobile application for better community engagement.",
      options: [
        { id: 1, text: "Yes, fund the mobile app", votes: 180, percentage: 72 },
        { id: 2, text: "No, do not fund", votes: 70, percentage: 28 },
      ],
      settings: {
        votingMethod: "Yes/No",
        deadline: "March 18, 2024 at 6:00 PM UTC",
        eligibility: "All verified community members",
        quorum: "15% of active members",
        privacy: "Anonymous voting",
      },
      totalVotes: 250,
      quorumRequired: 400,
    },
  ]

  // Mock data for active proposals
  const activeProposals = [
    {
      id: 1,
      title: "Establish Community Code of Conduct",
      community: "Developer Collective",
      author: "moderator.eth",
      timeLeft: "3 days left",
      status: "discussion",
      comments: 23,
      likes: 45,
      description:
        "This proposal aims to establish a comprehensive code of conduct for our community to ensure a safe, inclusive, and productive environment for all members. The code will outline expected behaviors, consequences for violations, and procedures for reporting issues.",
      details: {
        category: "Governance",
        created: "March 10, 2024",
        discussionPeriod: "7 days",
        votingPeriod: "5 days (after discussion)",
        quorumRequired: "15% of active members",
        passingThreshold: "Simple majority (>50%)",
      },
      sections: [
        {
          title: "Core Principles",
          content: "Respect, inclusivity, constructive communication, and collaborative problem-solving.",
        },
        {
          title: "Expected Behaviors",
          content:
            "Professional communication, constructive feedback, respect for diverse opinions, and adherence to community guidelines.",
        },
        {
          title: "Prohibited Actions",
          content:
            "Harassment, discrimination, spam, off-topic discussions, and violation of intellectual property rights.",
        },
      ],
      timeline: [
        { phase: "Discussion", duration: "7 days", status: "active" },
        { phase: "Review", duration: "2 days", status: "pending" },
        { phase: "Voting", duration: "5 days", status: "pending" },
        { phase: "Implementation", duration: "Ongoing", status: "pending" },
      ],
    },
    {
      id: 2,
      title: "Partnership with Green Energy Initiative",
      community: "Green Energy DAO",
      author: "sustainability.dao",
      timeLeft: "1 week left",
      status: "review",
      comments: 12,
      likes: 67,
      description:
        "Proposal to establish a strategic partnership with the Global Green Energy Initiative to collaborate on sustainable blockchain solutions and carbon offset programs for our DAO operations.",
      details: {
        category: "Partnership",
        created: "March 8, 2024",
        discussionPeriod: "10 days",
        votingPeriod: "7 days (after discussion)",
        quorumRequired: "20% of token holders",
        passingThreshold: "60% approval required",
      },
      sections: [
        {
          title: "Partnership Benefits",
          content:
            "Access to green energy credits, carbon offset programs, sustainable technology solutions, and joint research opportunities.",
        },
        {
          title: "Financial Commitment",
          content: "Initial investment of $25,000 for partnership setup and first-year collaboration costs.",
        },
        {
          title: "Expected Outcomes",
          content:
            "50% reduction in carbon footprint, access to renewable energy solutions, and enhanced reputation as a sustainable DAO.",
        },
      ],
      timeline: [
        { phase: "Discussion", duration: "10 days", status: "completed" },
        { phase: "Review", duration: "3 days", status: "active" },
        { phase: "Voting", duration: "7 days", status: "pending" },
        { phase: "Implementation", duration: "30 days", status: "pending" },
      ],
    },
    {
      id: 3,
      title: "Increase Community Treasury Allocation",
      community: "DeFi Builders",
      author: "treasury.eth",
      timeLeft: "2 days left",
      status: "voting",
      comments: 45,
      likes: 89,
      hasVoted: false,
      currentResults: {
        yes: { votes: 234, percentage: 67 },
        no: { votes: 115, percentage: 33 },
        totalVotes: 349,
        quorumRequired: 500,
      },
      description:
        "Proposal to increase the community treasury allocation from 15% to 25% of protocol fees to fund more community initiatives, grants, and development projects.",
      details: {
        category: "Treasury",
        created: "March 5, 2024",
        discussionPeriod: "7 days (completed)",
        votingPeriod: "5 days",
        quorumRequired: "20% of token holders",
        passingThreshold: "Simple majority (>50%)",
      },
      sections: [
        {
          title: "Current Allocation",
          content:
            "Currently 15% of protocol fees go to the community treasury, totaling approximately $150,000 monthly.",
        },
        {
          title: "Proposed Changes",
          content:
            "Increase allocation to 25%, which would provide approximately $250,000 monthly for community initiatives.",
        },
        {
          title: "Use of Additional Funds",
          content: "Developer grants, community events, marketing initiatives, and emergency fund reserves.",
        },
      ],
      timeline: [
        { phase: "Discussion", duration: "7 days", status: "completed" },
        { phase: "Review", duration: "2 days", status: "completed" },
        { phase: "Voting", duration: "5 days", status: "active" },
        { phase: "Implementation", duration: "14 days", status: "pending" },
      ],
    },
  ]

  const [proposalVotes, setProposalVotes] = useState<{ [key: number]: "yes" | "no" | null }>({})

  const handleProposalVote = (proposalId: number, vote: "yes" | "no") => {
    setProposalVotes((prev) => ({
      ...prev,
      [proposalId]: vote,
    }))

    // Update the proposal's hasVoted status
    const updatedProposals = activeProposals.map((proposal) =>
      proposal.id === proposalId ? { ...proposal, hasVoted: true } : proposal,
    )
    // In a real app, you would update the state or make an API call here
    console.log(`Voted ${vote} on proposal ${proposalId}`)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "proposal":
        return <Vote className="w-4 h-4 text-blue-600" />
      case "comment":
        return <MessageCircle className="w-4 h-4 text-green-600" />
      case "member":
        return <UserPlus className="w-4 h-4 text-purple-600" />
      case "vote":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />
      case "like":
        return <Heart className="w-4 h-4 text-red-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-300"
    }
  }

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const dismissNotification = (notificationId: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const recentNotifications = notifications.slice(0, 5)

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
            <Link href="/dashboard" className="text-foreground font-medium">
              Dashboard
            </Link>
            <Link href="/communities" className="text-muted-foreground hover:text-foreground">
              Communities
            </Link>
            <Link href="/chat" className="text-muted-foreground hover:text-foreground">
              Chat
            </Link>
            <Link href="/claim-nft" className="text-muted-foreground hover:text-foreground">
              Claim NFT
            </Link>
            <Link href="/governance-explorer" className="text-muted-foreground hover:text-foreground">
              Explorer
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            {/* Create Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/create-proposal" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Proposal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/create-vote" className="flex items-center">
                    <Vote className="mr-2 h-4 w-4" />
                    Create Vote
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Notifications Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        Mark all read
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/notifications">
                        <Settings className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-96">
                  <div className="p-2">
                    {recentNotifications.length > 0 ? (
                      <div className="space-y-2">
                        {recentNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                              !notification.isRead ? "bg-primary/5" : "bg-muted/30"
                            } hover:bg-muted/50 transition-colors cursor-pointer`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2 flex-1">
                                <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <p className="text-sm font-medium truncate">{notification.title}</p>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {notification.description}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      {notification.community}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-6 h-6 ml-2 opacity-0 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  dismissNotification(notification.id)
                                }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No notifications</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                {notifications.length > 5 && (
                  <div className="p-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link href="/notifications">
                        View all notifications
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <ThemeToggle />
            <Avatar className="w-8 h-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening in your communities today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Votes</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Communities</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Joined this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participation</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Your Communities */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Communities</CardTitle>
              <CardDescription>Communities you're actively participating in</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/communities">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {userCommunities.map((community) => (
                <Link href={`/community/${community.id}`} key={community.id}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={community.avatar || "/placeholder.svg"} alt={community.name} />
                          <AvatarFallback>{community.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{community.name}</h3>
                          <p className="text-xs text-muted-foreground">{community.members} members</p>
                        </div>
                        {community.unreadCount > 0 && (
                          <Badge className="w-5 h-5 flex items-center justify-center p-0 text-xs">
                            {community.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Last activity</span>
                        <span>{community.lastActivity}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Votes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Votes</CardTitle>
                <CardDescription>Votes requiring your attention</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/create-proposal" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Proposal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/create-vote" className="flex items-center">
                      <Vote className="mr-2 h-4 w-4" />
                      Create Vote
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeVotes.map((vote) => (
                <div key={vote.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{vote.title}</h3>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <Badge variant="outline">{vote.community}</Badge>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{vote.timeLeft}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Participation</span>
                      <span>{vote.participation}%</span>
                    </div>
                    <Progress value={vote.participation} className="h-2" />
                  </div>
                  {!userHasRequiredNFT && vote.settings.nftRequired && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-3">
                      <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">NFT Required</span>
                      </div>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                        You need a DAO Governance Pass NFT to participate in this vote.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent" asChild>
                        <Link href="/claim-nft">Claim NFT</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Button size="sm" asChild>
                      <Link href={`/vote/${vote.id}`}>Vote Now</Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedVoteDetails(vote)}>
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{selectedVoteDetails?.title}</DialogTitle>
                          <DialogDescription>
                            <Badge variant="outline" className="mr-2">
                              {selectedVoteDetails?.community}
                            </Badge>
                            {selectedVoteDetails?.timeLeft}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedVoteDetails && (
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-medium mb-2">Description</h4>
                              <p className="text-sm text-muted-foreground">{selectedVoteDetails.description}</p>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Current Results</h4>
                              <div className="space-y-3">
                                {selectedVoteDetails.options.map((option: any) => (
                                  <div key={option.id} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                      <span>{option.text}</span>
                                      <span className="font-medium">
                                        {option.percentage}% ({option.votes} votes)
                                      </span>
                                    </div>
                                    <Progress value={option.percentage} className="h-2" />
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 p-3 bg-muted rounded-lg">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Total Votes</span>
                                  <span className="font-medium">{selectedVoteDetails.totalVotes}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm mt-1">
                                  <span>Quorum Required</span>
                                  <span className="font-medium">{selectedVoteDetails.quorumRequired}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-3">Vote Settings</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Vote className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Method:</span>
                                    <span>{selectedVoteDetails.settings.votingMethod}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Deadline:</span>
                                    <span>{selectedVoteDetails.settings.deadline}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Shield className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Eligibility:</span>
                                    <span>{selectedVoteDetails.settings.eligibility}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Quorum:</span>
                                    <span>{selectedVoteDetails.settings.quorum}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {selectedVoteDetails.settings.privacy === "Public voting" ? (
                                      <Eye className="w-4 h-4 text-muted-foreground" />
                                    ) : (
                                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                                    )}
                                    <span className="text-muted-foreground">Privacy:</span>
                                    <span>{selectedVoteDetails.settings.privacy}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 pt-4 border-t">
                              <Button asChild>
                                <Link href={`/vote/${selectedVoteDetails.id}`}>
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Go to Vote
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Proposals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Proposals</CardTitle>
                <CardDescription>Proposals in discussion phase</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/create-proposal" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Create Proposal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/create-vote" className="flex items-center">
                      <Vote className="mr-2 h-4 w-4" />
                      Create Vote
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeProposals.map((proposal) => (
                <div key={proposal.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{proposal.title}</h3>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <Badge variant="outline">{proposal.community}</Badge>
                        <span>by {proposal.author}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{proposal.timeLeft}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        proposal.status === "discussion"
                          ? "default"
                          : proposal.status === "voting"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {proposal.status}
                    </Badge>
                  </div>

                  {/* Show voting results for voting phase proposals */}
                  {proposal.status === "voting" && proposal.currentResults && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Current Results</span>
                        <span>
                          {proposal.currentResults.totalVotes} / {proposal.currentResults.quorumRequired} votes
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>Yes</span>
                          </span>
                          <span>
                            {proposal.currentResults.yes.percentage}% ({proposal.currentResults.yes.votes})
                          </span>
                        </div>
                        <Progress value={proposal.currentResults.yes.percentage} className="h-1" />
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center space-x-1">
                            <X className="w-3 h-3 text-red-600" />
                            <span>No</span>
                          </span>
                          <span>
                            {proposal.currentResults.no.percentage}% ({proposal.currentResults.no.votes})
                          </span>
                        </div>
                        <Progress value={proposal.currentResults.no.percentage} className="h-1" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{proposal.comments} comments</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{proposal.likes} likes</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Show voting buttons for proposals in voting phase */}
                      {proposal.status === "voting" && !proposal.hasVoted && !proposalVotes[proposal.id] && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                            onClick={() => handleProposalVote(proposal.id, "yes")}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Yes
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                            onClick={() => handleProposalVote(proposal.id, "no")}
                          >
                            <X className="w-3 h-3 mr-1" />
                            No
                          </Button>
                        </>
                      )}

                      {/* Show voted status */}
                      {(proposal.hasVoted || proposalVotes[proposal.id]) && proposal.status === "voting" && (
                        <Badge variant="secondary" className="text-xs">
                          Voted {proposalVotes[proposal.id] || "Yes"}
                        </Badge>
                      )}

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedProposalDetails(proposal)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedProposalDetails?.title}</DialogTitle>
                            <DialogDescription>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="outline">{selectedProposalDetails?.community}</Badge>
                                <span>by {selectedProposalDetails?.author}</span>
                                <Badge
                                  variant={
                                    selectedProposalDetails?.status === "discussion"
                                      ? "default"
                                      : selectedProposalDetails?.status === "voting"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {selectedProposalDetails?.status}
                                </Badge>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                          {selectedProposalDetails && (
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-sm text-muted-foreground">{selectedProposalDetails.description}</p>
                              </div>

                              {/* Show voting section for proposals in voting phase */}
                              {selectedProposalDetails.status === "voting" &&
                                selectedProposalDetails.currentResults && (
                                  <div>
                                    <h4 className="font-medium mb-3">Current Voting Results</h4>
                                    <div className="space-y-3">
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                          <span className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span>Yes - Support this proposal</span>
                                          </span>
                                          <span className="font-medium">
                                            {selectedProposalDetails.currentResults.yes.percentage}% (
                                            {selectedProposalDetails.currentResults.yes.votes} votes)
                                          </span>
                                        </div>
                                        <Progress
                                          value={selectedProposalDetails.currentResults.yes.percentage}
                                          className="h-2"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                          <span className="flex items-center space-x-2">
                                            <X className="w-4 h-4 text-red-600" />
                                            <span>No - Reject this proposal</span>
                                          </span>
                                          <span className="font-medium">
                                            {selectedProposalDetails.currentResults.no.percentage}% (
                                            {selectedProposalDetails.currentResults.no.votes} votes)
                                          </span>
                                        </div>
                                        <Progress
                                          value={selectedProposalDetails.currentResults.no.percentage}
                                          className="h-2"
                                        />
                                      </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-muted rounded-lg">
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Total Votes</span>
                                        <span className="font-medium">
                                          {selectedProposalDetails.currentResults.totalVotes}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm mt-1">
                                        <span>Quorum Required</span>
                                        <span className="font-medium">
                                          {selectedProposalDetails.currentResults.quorumRequired}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm mt-1">
                                        <span>Quorum Progress</span>
                                        <span className="font-medium">
                                          {Math.round(
                                            (selectedProposalDetails.currentResults.totalVotes /
                                              selectedProposalDetails.currentResults.quorumRequired) *
                                              100,
                                          )}
                                          %
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                              <div>
                                <h4 className="font-medium mb-3">Proposal Details</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">Category:</span>
                                      <span>{selectedProposalDetails.details.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">Created:</span>
                                      <span>{selectedProposalDetails.details.created}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">Discussion Period:</span>
                                      <span>{selectedProposalDetails.details.discussionPeriod}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">Voting Period:</span>
                                      <span>{selectedProposalDetails.details.votingPeriod}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">Quorum Required:</span>
                                      <span>{selectedProposalDetails.details.quorumRequired}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">Passing Threshold:</span>
                                      <span>{selectedProposalDetails.details.passingThreshold}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-3">Proposal Sections</h4>
                                <div className="space-y-4">
                                  {selectedProposalDetails.sections.map((section: any, index: number) => (
                                    <div key={index} className="border rounded-lg p-4">
                                      <h5 className="font-medium mb-2">{section.title}</h5>
                                      <p className="text-sm text-muted-foreground">{section.content}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-3">Timeline</h4>
                                <div className="space-y-3">
                                  {selectedProposalDetails.timeline.map((phase: any, index: number) => (
                                    <div key={index} className="flex items-center space-x-4">
                                      <div
                                        className={`w-3 h-3 rounded-full ${
                                          phase.status === "completed"
                                            ? "bg-green-500"
                                            : phase.status === "active"
                                              ? "bg-blue-500"
                                              : "bg-gray-300"
                                        }`}
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <span className="font-medium text-sm">{phase.phase}</span>
                                          <Badge
                                            variant={
                                              phase.status === "completed"
                                                ? "default"
                                                : phase.status === "active"
                                                  ? "default"
                                                  : "secondary"
                                            }
                                            className="text-xs"
                                          >
                                            {phase.status}
                                          </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{phase.duration}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-3">Community Engagement</h4>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="text-center p-3 bg-muted rounded-lg">
                                    <div className="text-2xl font-bold">{selectedProposalDetails.comments}</div>
                                    <div className="text-xs text-muted-foreground">Comments</div>
                                  </div>
                                  <div className="text-center p-3 bg-muted rounded-lg">
                                    <div className="text-2xl font-bold">{selectedProposalDetails.likes}</div>
                                    <div className="text-xs text-muted-foreground">Likes</div>
                                  </div>
                                  <div className="text-center p-3 bg-muted rounded-lg">
                                    <div className="text-2xl font-bold">156</div>
                                    <div className="text-xs text-muted-foreground">Views</div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t">
                                <div className="text-sm text-muted-foreground">
                                  Time remaining: {selectedProposalDetails.timeLeft}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {selectedProposalDetails.status === "voting" &&
                                    !selectedProposalDetails.hasVoted &&
                                    !proposalVotes[selectedProposalDetails.id] && (
                                      <>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                                          onClick={() => handleProposalVote(selectedProposalDetails.id, "yes")}
                                        >
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          Vote Yes
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                                          onClick={() => handleProposalVote(selectedProposalDetails.id, "no")}
                                        >
                                          <X className="w-4 h-4 mr-2" />
                                          Vote No
                                        </Button>
                                      </>
                                    )}
                                  {selectedProposalDetails.status === "discussion" && (
                                    <Button variant="outline" size="sm">
                                      <MessageCircle className="w-4 h-4 mr-2" />
                                      Join Discussion
                                    </Button>
                                  )}
                                  <Button size="sm">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Full Proposal
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
