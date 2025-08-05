"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Clock,
  Users,
  CheckCircle,
  X,
  Bell,
  Share,
  Flag,
  TrendingUp,
  Eye,
  VoteIcon,
  User,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface Candidate {
  id: string
  name: string
  photo?: string
  description: string
  campaignPitch: string
  votes: number
  percentage: number
}

interface VoteOption {
  id: string
  title: string
  description: string
  votes: number
  percentage: number
}

export default function VotePage() {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [rankedChoices, setRankedChoices] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")
  const [activeTab, setActiveTab] = useState("vote")

  // Mock vote data
  const voteData = {
    id: "vote-1",
    title: "Community Leadership Election 2024",
    description:
      "Election for the next community leader who will guide our DAO's strategic direction, represent us in partnerships, and coordinate major initiatives for the next 12 months.",
    community: "DeFi Builders",
    type: "single-choice", // single-choice, ranked-choice, yes-no, multiple-choice
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    totalVotes: 1247,
    resultsVisible: true,
    allowAbstain: true,
    restrictions: {
      membersOnly: true,
      oneVotePerWallet: true,
      minimumTokens: 100,
    },
    status: "active", // active, ended, upcoming
  }

  // Mock candidates for election
  const candidates: Candidate[] = [
    {
      id: "candidate-1",
      name: "Alice Johnson",
      photo: "/placeholder.svg?height=64&width=64&text=AJ",
      description: "Experienced DeFi developer with 5+ years in blockchain governance and protocol design.",
      campaignPitch:
        "I believe in transparent governance and community-driven decision making. My focus will be on sustainable growth, innovative partnerships, and ensuring every voice in our community is heard. Together, we can build the future of decentralized finance.",
      votes: 487,
      percentage: 39.1,
    },
    {
      id: "candidate-2",
      name: "Bob Chen",
      photo: "/placeholder.svg?height=64&width=64&text=BC",
      description: "Former traditional finance executive turned DeFi advocate, specializing in institutional adoption.",
      campaignPitch:
        "My vision is to bridge traditional finance with DeFi, bringing institutional partnerships while maintaining our decentralized values. I'll focus on regulatory compliance, risk management, and scaling our impact globally.",
      votes: 356,
      percentage: 28.5,
    },
    {
      id: "candidate-3",
      name: "Carol Davis",
      photo: "/placeholder.svg?height=64&width=64&text=CD",
      description: "Community organizer and governance researcher with expertise in DAO operations and tokenomics.",
      campaignPitch:
        "Community first, always. I'll prioritize member engagement, fair token distribution, and building robust governance mechanisms. Let's create a DAO that truly serves its members and leads by example in the space.",
      votes: 289,
      percentage: 23.2,
    },
    {
      id: "candidate-4",
      name: "David Wilson",
      photo: "/placeholder.svg?height=64&width=64&text=DW",
      description: "Technical architect and security expert focused on protocol safety and innovation.",
      campaignPitch:
        "Security and innovation go hand in hand. I'll ensure our protocols are bulletproof while pushing the boundaries of what's possible in DeFi. My priority is building trust through technical excellence.",
      votes: 115,
      percentage: 9.2,
    },
  ]

  // Mock vote options for other types
  const voteOptions: VoteOption[] = [
    {
      id: "yes",
      title: "Yes",
      description: "Approve the proposal",
      votes: 892,
      percentage: 71.5,
    },
    {
      id: "no",
      title: "No",
      description: "Reject the proposal",
      votes: 245,
      percentage: 19.6,
    },
    {
      id: "abstain",
      title: "Abstain",
      description: "No preference",
      votes: 110,
      percentage: 8.9,
    },
  ]

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date().getTime()
      const deadline = voteData.deadline.getTime()
      const difference = deadline - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`)
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`)
        } else {
          setTimeLeft(`${minutes}m`)
        }
      } else {
        setTimeLeft("Ended")
      }
    }

    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [voteData.deadline])

  const handleVote = () => {
    if (voteData.type === "single-choice" && selectedChoice) {
      console.log("Voting for:", selectedChoice)
      setHasVoted(true)
    } else if (voteData.type === "ranked-choice" && rankedChoices.length > 0) {
      console.log("Ranked choices:", rankedChoices)
      setHasVoted(true)
    }
  }

  const handleRankedChoice = (candidateId: string) => {
    if (rankedChoices.includes(candidateId)) {
      setRankedChoices((prev) => prev.filter((id) => id !== candidateId))
    } else {
      setRankedChoices((prev) => [...prev, candidateId])
    }
  }

  const getRankNumber = (candidateId: string) => {
    const index = rankedChoices.indexOf(candidateId)
    return index >= 0 ? index + 1 : null
  }

  const getVoteTypeLabel = (type: string) => {
    switch (type) {
      case "single-choice":
        return "Single Choice Election"
      case "ranked-choice":
        return "Ranked Choice Voting"
      case "yes-no":
        return "Yes/No Decision"
      case "multiple-choice":
        return "Multiple Choice"
      default:
        return "Vote"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "ended":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const isElectionType = voteData.type === "single-choice" || voteData.type === "ranked-choice"
  const canVote = voteData.status === "active" && !hasVoted

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Vote Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{voteData.title}</h1>
                <Badge className={getStatusColor(voteData.status)}>
                  {voteData.status.charAt(0).toUpperCase() + voteData.status.slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground text-lg mb-4">{voteData.description}</p>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{voteData.community}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <VoteIcon className="w-4 h-4" />
                  <span>{getVoteTypeLabel(voteData.type)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{timeLeft === "Ended" ? "Voting ended" : `${timeLeft} remaining`}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{voteData.totalVotes} votes cast</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Voting Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="vote">Vote</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              {/* Voting Tab */}
              <TabsContent value="vote" className="space-y-6 mt-6">
                {hasVoted ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Vote Submitted Successfully!</h3>
                      <p className="text-muted-foreground mb-4">
                        Your vote has been recorded and will be counted in the final results.
                      </p>
                      <Button variant="outline" onClick={() => setActiveTab("results")}>
                        View Results
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {isElectionType && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold">
                            {voteData.type === "ranked-choice" ? "Rank Your Choices" : "Choose Your Candidate"}
                          </h2>
                          {voteData.type === "ranked-choice" && (
                            <p className="text-sm text-muted-foreground">
                              Click candidates to rank them (1st choice, 2nd choice, etc.)
                            </p>
                          )}
                        </div>

                        {candidates.map((candidate) => (
                          <Card
                            key={candidate.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              voteData.type === "single-choice" && selectedChoice === candidate.id
                                ? "ring-2 ring-primary"
                                : ""
                            } ${
                              voteData.type === "ranked-choice" && rankedChoices.includes(candidate.id)
                                ? "ring-2 ring-primary"
                                : ""
                            }`}
                            onClick={() => {
                              if (voteData.type === "single-choice") {
                                setSelectedChoice(candidate.id)
                              } else if (voteData.type === "ranked-choice") {
                                handleRankedChoice(candidate.id)
                              }
                            }}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className="relative">
                                  <Avatar className="w-16 h-16">
                                    <AvatarImage src={candidate.photo || "/placeholder.svg"} alt={candidate.name} />
                                    <AvatarFallback className="text-lg font-semibold">
                                      {candidate.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  {voteData.type === "ranked-choice" && getRankNumber(candidate.id) && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                      {getRankNumber(candidate.id)}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold mb-2">{candidate.name}</h3>
                                  <p className="text-sm text-muted-foreground mb-3">{candidate.description}</p>

                                  {candidate.campaignPitch && (
                                    <div className="p-3 bg-muted/50 rounded-lg">
                                      <p className="text-sm italic">"{candidate.campaignPitch}"</p>
                                    </div>
                                  )}
                                </div>

                                {voteData.type === "single-choice" && selectedChoice === candidate.id && (
                                  <CheckCircle className="w-6 h-6 text-primary" />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {voteData.type === "yes-no" && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Cast Your Vote</h2>

                        {voteOptions.map((option) => (
                          <Card
                            key={option.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedChoice === option.id ? "ring-2 ring-primary" : ""
                            }`}
                            onClick={() => setSelectedChoice(option.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  {option.id === "yes" && <CheckCircle className="w-5 h-5 text-green-600" />}
                                  {option.id === "no" && <X className="w-5 h-5 text-red-600" />}
                                  {option.id === "abstain" && (
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                                  )}
                                  <div>
                                    <h3 className="font-medium">{option.title}</h3>
                                    <p className="text-sm text-muted-foreground">{option.description}</p>
                                  </div>
                                </div>
                                {selectedChoice === option.id && <CheckCircle className="w-5 h-5 text-primary" />}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {canVote && (
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium mb-1">Ready to submit your vote?</h3>
                              <p className="text-sm text-muted-foreground">
                                {voteData.type === "single-choice" && selectedChoice && "You've selected a candidate"}
                                {voteData.type === "ranked-choice" &&
                                  rankedChoices.length > 0 &&
                                  `You've ranked ${rankedChoices.length} candidate(s)`}
                                {voteData.type === "yes-no" && selectedChoice && "You've made your choice"}
                                {!selectedChoice && rankedChoices.length === 0 && "Please make your selection above"}
                              </p>
                            </div>
                            <Button
                              onClick={handleVote}
                              disabled={!selectedChoice && rankedChoices.length === 0}
                              size="lg"
                            >
                              <VoteIcon className="w-4 h-4 mr-2" />
                              Submit Vote
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </TabsContent>

              {/* Results Tab */}
              <TabsContent value="results" className="space-y-6 mt-6">
                {voteData.resultsVisible ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold">Live Results</h2>
                      <Badge variant="secondary">{voteData.totalVotes} total votes</Badge>
                    </div>

                    {isElectionType &&
                      candidates.map((candidate) => (
                        <Card key={candidate.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4 mb-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={candidate.photo || "/placeholder.svg"} alt={candidate.name} />
                                <AvatarFallback>
                                  {candidate.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium">{candidate.name}</h3>
                                  <div className="text-right">
                                    <div className="font-semibold">{candidate.percentage}%</div>
                                    <div className="text-sm text-muted-foreground">{candidate.votes} votes</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Progress value={candidate.percentage} className="h-2" />
                          </CardContent>
                        </Card>
                      ))}

                    {voteData.type === "yes-no" &&
                      voteOptions.map((option) => (
                        <Card key={option.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                {option.id === "yes" && <CheckCircle className="w-5 h-5 text-green-600" />}
                                {option.id === "no" && <X className="w-5 h-5 text-red-600" />}
                                {option.id === "abstain" && (
                                  <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                                )}
                                <h3 className="font-medium">{option.title}</h3>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{option.percentage}%</div>
                                <div className="text-sm text-muted-foreground">{option.votes} votes</div>
                              </div>
                            </div>
                            <Progress value={option.percentage} className="h-2" />
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Eye className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Results Hidden</h3>
                      <p className="text-muted-foreground">Results will be revealed after the voting deadline ends.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vote Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Vote Type</Label>
                        <p className="font-medium">{getVoteTypeLabel(voteData.type)}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Community</Label>
                        <p className="font-medium">{voteData.community}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Deadline</Label>
                        <p className="font-medium">{voteData.deadline.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Total Votes</Label>
                        <p className="font-medium">{voteData.totalVotes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Voting Restrictions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {voteData.restrictions.membersOnly ? "Community members only" : "Open to all"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {voteData.restrictions.oneVotePerWallet ? "One vote per wallet" : "Multiple votes allowed"}
                      </span>
                    </div>
                    {voteData.restrictions.minimumTokens && (
                      <div className="flex items-center space-x-2">
                        <VoteIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Minimum {voteData.restrictions.minimumTokens} tokens required</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vote Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vote Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{timeLeft}</div>
                  <p className="text-sm text-muted-foreground">
                    {timeLeft === "Ended" ? "Voting has ended" : "Time remaining"}
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Votes</span>
                    <span className="font-medium">{voteData.totalVotes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Participation</span>
                    <span className="font-medium">78.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Your Status</span>
                    <Badge variant={hasVoted ? "default" : "secondary"}>{hasVoted ? "Voted" : "Not Voted"}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-transparent" size="sm" variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share Vote
                </Button>
                <Button className="w-full bg-transparent" size="sm" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Get Notifications
                </Button>
                <Button className="w-full bg-transparent" size="sm" variant="outline">
                  <Flag className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>

            {/* Community Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{voteData.community}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Members</span>
                  <span className="text-sm font-medium">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Votes</span>
                  <span className="text-sm font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Proposals</span>
                  <span className="text-sm font-medium">15</span>
                </div>
                <Button className="w-full bg-transparent" size="sm" variant="outline" asChild>
                  <Link href="/community/defi-builders">View Community</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
