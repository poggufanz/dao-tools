"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, MinusCircle, Clock, User, Shield, Star, Vote, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Add this import at the top
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data
const mockProposals = [
  {
    id: 1,
    title: "Implement New Student Parking Policy",
    description: "Proposal to restructure campus parking allocation with priority for seniors and graduate students.",
    createdBy: "Student Council",
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    votingType: "One-Person-One-Vote",
    votes: { yes: 156, no: 43, abstain: 12 },
    totalVotes: 211,
    userVote: null,
  },
  {
    id: 2,
    title: "Allocate Budget for Community Garden",
    description: "Proposal to allocate $15,000 from community funds for establishing a shared garden space.",
    createdBy: "Green Initiative DAO",
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    votingType: "Token Vote",
    votes: { yes: 2340, no: 890, abstain: 156 },
    totalVotes: 3386,
    userVote: "yes",
  },
]

// Mock active votes data
const mockActiveVotes = [
  {
    id: "vote-1",
    title: "Community Leadership Election 2024",
    description: "Election for the next community leader who will guide our DAO's strategic direction.",
    community: "DeFi Builders",
    type: "single-choice",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    totalVotes: 1247,
    hasVoted: false,
    topCandidate: "Alice Johnson",
    leadingPercentage: 39.1,
  },
  {
    id: "vote-2",
    title: "Treasury Allocation Proposal",
    description: "Decide how to allocate 500,000 USDC from the community treasury.",
    community: "Climate Action DAO",
    type: "yes-no",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    totalVotes: 892,
    hasVoted: true,
    yesPercentage: 71.5,
  },
  {
    id: "vote-3",
    title: "New Partnership Approval",
    description: "Vote on strategic partnership with EcoTech Solutions for carbon offset projects.",
    community: "University DAO",
    type: "multiple-choice",
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    totalVotes: 234,
    hasVoted: false,
    topOption: "Approve with conditions",
    leadingPercentage: 45.2,
  },
]

const mockUser = {
  identity: "alice@university.edu",
  verification: "Email Verified",
  reputation: 85,
  role: "Student",
}

export default function Dashboard() {
  const [proposals, setProposals] = useState(mockProposals)

  const handleVote = (proposalId: number, vote: "yes" | "no" | "abstain") => {
    setProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id === proposalId) {
          const updatedVotes = { ...proposal.votes }

          // Remove previous vote if exists
          if (proposal.userVote) {
            updatedVotes[proposal.userVote as keyof typeof updatedVotes]--
          }

          // Add new vote
          updatedVotes[vote]++

          return {
            ...proposal,
            votes: updatedVotes,
            totalVotes: proposal.totalVotes + (proposal.userVote ? 0 : 1),
            userVote: vote,
          }
        }
        return proposal
      }),
    )
  }

  const formatTimeRemaining = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h remaining`
    return `${hours}h remaining`
  }

  const getVotingTypeColor = (type: string) => {
    switch (type) {
      case "One-Person-One-Vote":
        return "bg-blue-100 text-blue-800"
      case "Token Vote":
        return "bg-green-100 text-green-800"
      case "Quadratic":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getVoteTypeLabel = (type: string) => {
    switch (type) {
      case "single-choice":
        return "Single Choice"
      case "ranked-choice":
        return "Ranked Choice"
      case "yes-no":
        return "Yes/No"
      case "multiple-choice":
        return "Multiple Choice"
      default:
        return "Vote"
    }
  }

  const getVoteTypeColor = (type: string) => {
    switch (type) {
      case "single-choice":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "ranked-choice":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "yes-no":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "multiple-choice":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
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
            <Link href="/create-proposal" className="text-muted-foreground hover:text-foreground">
              Create Proposal
            </Link>
            <Link href="/create-vote" className="text-muted-foreground hover:text-foreground">
              Create Vote
            </Link>
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">
              Admin
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Avatar>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{mockUser.identity}</span>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">

        {/* Your Communities Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Communities</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "DAO Hackers", slug: "dao-hackers" },
              { name: "Coding Club", slug: "coding-club" },
              { name: "Web3 Builders", slug: "web3-builders" },
            ].map((comm) => (
              <Card key={comm.slug}>
                <CardHeader>
                  <CardTitle>{comm.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/community/${comm.slug}`}>
                    <Button variant="default">View</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            <Link href="/communities">
              <Button variant="outline">Join More Communities</Button>
            </Link>
            <Link href="/create-community">
              <Button>Create New Community</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Active Votes Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Active Votes</h2>
                <Button asChild>
                  <Link href="/create-vote">Create Vote</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {mockActiveVotes.map((vote) => (
                  <Card key={vote.id} className="w-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-lg">{vote.title}</CardTitle>
                            <Badge className={getVoteTypeColor(vote.type)}>{getVoteTypeLabel(vote.type)}</Badge>
                            {vote.hasVoted && (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              >
                                Voted
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-base mb-3">{vote.description}</CardDescription>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{vote.community}</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatTimeRemaining(vote.deadline)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {vote.totalVotes} votes
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Vote Results Preview */}
                      <div className="space-y-3 mb-4">
                        {vote.type === "single-choice" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Leading: {vote.topCandidate}</span>
                              <span>{vote.leadingPercentage}%</span>
                            </div>
                            <Progress value={vote.leadingPercentage} className="h-2" />
                          </div>
                        )}

                        {vote.type === "yes-no" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Yes votes</span>
                              <span>{vote.yesPercentage}%</span>
                            </div>
                            <Progress value={vote.yesPercentage} className="h-2" />
                          </div>
                        )}

                        {vote.type === "multiple-choice" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Leading: {vote.topOption}</span>
                              <span>{vote.leadingPercentage}%</span>
                            </div>
                            <Progress value={vote.leadingPercentage} className="h-2" />
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button asChild className="flex-1">
                          <Link href={`/vote/${vote.id}`}>
                            <Vote className="w-4 h-4 mr-2" />
                            {vote.hasVoted ? "View Results" : "Vote Now"}
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Traditional Proposals Section */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Active Proposals</h2>
              <Button asChild>
                <Link href="/create-proposal">Create Proposal</Link>
              </Button>
            </div>

            <div className="space-y-6">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="w-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                        <CardDescription className="text-base mb-3">{proposal.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Created by {proposal.createdBy}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTimeRemaining(proposal.expiresAt)}
                          </div>
                        </div>
                      </div>
                      <Badge className={getVotingTypeColor(proposal.votingType)}>{proposal.votingType}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Voting Buttons */}
                    <div className="flex gap-2 mb-4">
                      <Button
                        variant={proposal.userVote === "yes" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleVote(proposal.id, "yes")}
                        className="flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Yes ({proposal.votes.yes})
                      </Button>
                      <Button
                        variant={proposal.userVote === "no" ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleVote(proposal.id, "no")}
                        className="flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        No ({proposal.votes.no})
                      </Button>
                      <Button
                        variant={proposal.userVote === "abstain" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleVote(proposal.id, "abstain")}
                        className="flex items-center gap-1"
                      >
                        <MinusCircle className="w-4 h-4" />
                        Abstain ({proposal.votes.abstain})
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  User Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Identity</label>
                  <p className="text-sm font-mono">{mockUser.identity}</p>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Verification</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{mockUser.verification}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reputation Score</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{mockUser.reputation}/100</span>
                  </div>
                  <Progress value={mockUser.reputation} className="h-2 mt-2" />
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <Badge variant="secondary" className="mt-1">
                    {mockUser.role}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
