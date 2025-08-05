"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  FileText,
  Bell,
  ExternalLink,
  Copy,
  Wallet,
  Star,
  Award,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ClaimNFTPage() {
  const [activeTab, setActiveTab] = useState("claim")
  const [claimMethod, setClaimMethod] = useState<string | null>(null)
  const [applicationData, setApplicationData] = useState({
    reason: "",
    experience: "",
    contribution: "",
    walletAddress: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Mock NFT collections data
  const nftCollections = [
    {
      id: 1,
      name: "DAO Governance Pass",
      description: "Essential NFT for participating in DAO governance and voting",
      image: "/placeholder.svg?height=200&width=200&text=DAO+Pass",
      totalSupply: 10000,
      claimed: 3247,
      requirements: ["Active community member", "Minimum 30 days membership", "Completed KYC"],
      benefits: ["Full voting rights", "Proposal creation", "Treasury access", "Exclusive events"],
      rarity: "Common",
      claimable: true,
    },
    {
      id: 2,
      name: "Contributor Badge",
      description: "Recognition NFT for active contributors and developers",
      image: "/placeholder.svg?height=200&width=200&text=Contributor",
      totalSupply: 5000,
      claimed: 1823,
      requirements: ["Merged pull request", "Community contribution", "Peer nomination"],
      benefits: ["Enhanced voting power", "Developer access", "Beta features", "Mentorship program"],
      rarity: "Rare",
      claimable: false,
    },
    {
      id: 3,
      name: "Founding Member",
      description: "Exclusive NFT for early supporters and founding members",
      image: "/placeholder.svg?height=200&width=200&text=Founder",
      totalSupply: 1000,
      claimed: 892,
      requirements: ["Founding member status", "Pre-launch participation", "Genesis contribution"],
      benefits: ["Maximum voting power", "Veto rights", "Revenue sharing", "Lifetime access"],
      rarity: "Legendary",
      claimable: false,
    },
  ]

  const userNFTs = [
    {
      id: 1,
      name: "DAO Governance Pass #3247",
      collection: "DAO Governance Pass",
      image: "/placeholder.svg?height=150&width=150&text=Pass+3247",
      claimedDate: "March 10, 2024",
      status: "Active",
      votingPower: 1,
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setApplicationData((prev) => ({ ...prev, [field]: value }))
  }

  const handleClaimSubmit = async (method: string) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setHasSubmitted(true)
  }

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setHasSubmitted(true)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "Rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "Legendary":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return <Shield className="w-4 h-4" />
      case "Rare":
        return <Star className="w-4 h-4" />
      case "Legendary":
        return <Award className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">NFT Access Center</h1>
              <p className="text-muted-foreground">Claim or request NFTs to unlock voting and proposal privileges</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
            <TabsTrigger value="claim">Available NFTs</TabsTrigger>
            <TabsTrigger value="owned">My NFTs</TabsTrigger>
            <TabsTrigger value="request">Request Access</TabsTrigger>
          </TabsList>

          {/* Available NFTs Tab */}
          <TabsContent value="claim" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nftCollections.map((nft) => (
                <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-4xl font-bold text-muted-foreground">NFT</span>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{nft.name}</CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className={getRarityColor(nft.rarity)}>
                            {getRarityIcon(nft.rarity)}
                            <span className="ml-1">{nft.rarity}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription>{nft.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Supply Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Claimed</span>
                        <span>
                          {nft.claimed} / {nft.totalSupply}
                        </span>
                      </div>
                      <Progress value={(nft.claimed / nft.totalSupply) * 100} className="h-2" />
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Requirements</h4>
                      <div className="space-y-1">
                        {nft.requirements.map((req, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Benefits</h4>
                      <div className="flex flex-wrap gap-1">
                        {nft.benefits.slice(0, 2).map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {nft.benefits.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{nft.benefits.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {nft.claimable ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full">
                              <Zap className="w-4 h-4 mr-2" />
                              Claim NFT
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Claim {nft.name}</DialogTitle>
                              <DialogDescription>Choose your preferred method to claim this NFT</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-3">
                                <Button
                                  variant="outline"
                                  className="w-full justify-start h-auto p-4 bg-transparent"
                                  onClick={() => handleClaimSubmit("wallet")}
                                  disabled={isSubmitting}
                                >
                                  <Wallet className="w-5 h-5 mr-3" />
                                  <div className="text-left">
                                    <div className="font-medium">Connect Wallet</div>
                                    <div className="text-sm text-muted-foreground">
                                      Automatically verify eligibility via wallet
                                    </div>
                                  </div>
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start h-auto p-4 bg-transparent"
                                  onClick={() => handleClaimSubmit("manual")}
                                  disabled={isSubmitting}
                                >
                                  <FileText className="w-5 h-5 mr-3" />
                                  <div className="text-left">
                                    <div className="font-medium">Manual Verification</div>
                                    <div className="text-sm text-muted-foreground">
                                      Submit proof of eligibility for review
                                    </div>
                                  </div>
                                </Button>
                              </div>
                              {isSubmitting && (
                                <div className="text-center py-4">
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                                  <p className="text-sm text-muted-foreground">Processing claim...</p>
                                </div>
                              )}
                              {hasSubmitted && (
                                <div className="text-center py-4">
                                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                  <p className="font-medium">Claim submitted successfully!</p>
                                  <p className="text-sm text-muted-foreground">
                                    You'll receive your NFT within 24 hours
                                  </p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button variant="outline" className="w-full bg-transparent" disabled>
                          <Clock className="w-4 h-4 mr-2" />
                          Not Available
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My NFTs Tab */}
          <TabsContent value="owned" className="space-y-6">
            {userNFTs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userNFTs.map((nft) => (
                  <Card key={nft.id} className="overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center">
                      <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-muted-foreground">#{nft.id}</span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{nft.name}</CardTitle>
                      <CardDescription>{nft.collection}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="flex items-center space-x-1 mt-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span className="font-medium">{nft.status}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Voting Power:</span>
                          <div className="font-medium mt-1">{nft.votingPower}x</div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Claimed:</span>
                          <div className="font-medium mt-1">{nft.claimedDate}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No NFTs Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't claimed any NFTs yet. Browse available NFTs to get started.
                </p>
                <Button onClick={() => setActiveTab("claim")}>
                  <Zap className="w-4 h-4 mr-2" />
                  Browse Available NFTs
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Request Access Tab */}
          <TabsContent value="request" className="space-y-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Request NFT Access</CardTitle>
                <CardDescription>
                  If you don't meet the automatic requirements, you can request manual review for NFT access
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!hasSubmitted ? (
                  <form onSubmit={handleApplicationSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="walletAddress">Wallet Address *</Label>
                      <Input
                        id="walletAddress"
                        placeholder="0x..."
                        value={applicationData.walletAddress}
                        onChange={(e) => handleInputChange("walletAddress", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Why do you need NFT access? *</Label>
                      <Textarea
                        id="reason"
                        placeholder="Explain why you need voting/proposal access and how you plan to contribute..."
                        rows={4}
                        value={applicationData.reason}
                        onChange={(e) => handleInputChange("reason", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Relevant Experience</Label>
                      <Textarea
                        id="experience"
                        placeholder="Describe your experience with DAOs, governance, or relevant skills..."
                        rows={3}
                        value={applicationData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contribution">Planned Contributions</Label>
                      <Textarea
                        id="contribution"
                        placeholder="How do you plan to contribute to the community?"
                        rows={3}
                        value={applicationData.contribution}
                        onChange={(e) => handleInputChange("contribution", e.target.value)}
                      />
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Review Process</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>Application submitted for review</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                          <span>Community voting on application (3-5 days)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                          <span>NFT minted and transferred (if approved)</span>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your application has been submitted for community review. You'll be notified of the decision
                      within 5-7 business days.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" asChild>
                        <Link href="/dashboard">Return to Dashboard</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
