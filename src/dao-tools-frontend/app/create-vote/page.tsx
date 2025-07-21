"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Eye,
  Calendar,
  Users,
  Shield,
  Plus,
  X,
  ImageIcon,
  Bell,
  Vote,
  CheckCircle,
  Clock,
  User,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface Candidate {
  id: string
  name: string
  photo: File | null
  description: string
  campaignPitch: string
}

interface VoteOption {
  id: string
  title: string
  description: string
}

export default function CreateVotePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    community: "",
    votingType: "",
    deadline: "",
    restrictions: {
      oneVotePerWallet: true,
      membersOnly: true,
      minimumTokens: "",
      nftRequired: false,
      nftContract: "",
    },
    resultsVisibility: "live", // live, after-deadline, manual
    allowAbstain: true,
  })

  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [voteOptions, setVoteOptions] = useState<VoteOption[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const votingTypes = [
    { value: "single-choice", label: "Single Choice Election", description: "Vote for one candidate" },
    { value: "ranked-choice", label: "Ranked Choice Voting", description: "Rank candidates by preference" },
    { value: "yes-no", label: "Yes/No Decision", description: "Traditional proposal voting" },
    { value: "multiple-choice", label: "Multiple Choice", description: "Choose from multiple options" },
  ]

  const communities = [
    { value: "defi-builders", label: "DeFi Builders" },
    { value: "university-dao", label: "University DAO" },
    { value: "climate-action", label: "Climate Action DAO" },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const addCandidate = () => {
    const newCandidate: Candidate = {
      id: `candidate-${Date.now()}`,
      name: "",
      photo: null,
      description: "",
      campaignPitch: "",
    }
    setCandidates((prev) => [...prev, newCandidate])
  }

  const updateCandidate = (id: string, field: keyof Candidate, value: string | File | null) => {
    setCandidates((prev) =>
      prev.map((candidate) => (candidate.id === id ? { ...candidate, [field]: value } : candidate)),
    )
  }

  const removeCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((candidate) => candidate.id !== id))
  }

  const addVoteOption = () => {
    const newOption: VoteOption = {
      id: `option-${Date.now()}`,
      title: "",
      description: "",
    }
    setVoteOptions((prev) => [...prev, newOption])
  }

  const updateVoteOption = (id: string, field: keyof VoteOption, value: string) => {
    setVoteOptions((prev) => prev.map((option) => (option.id === id ? { ...option, [field]: value } : option)))
  }

  const removeVoteOption = (id: string) => {
    setVoteOptions((prev) => prev.filter((option) => option.id !== id))
  }

  const handleFileUpload = (candidateId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    updateCandidate(candidateId, "photo", file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Vote created:", { formData, candidates, voteOptions })
    alert("Vote created successfully!")
  }

  const getVotingTypeDescription = (type: string) => {
    return votingTypes.find((vt) => vt.value === type)?.description || ""
  }

  const isElectionType = formData.votingType === "single-choice" || formData.votingType === "ranked-choice"
  const isYesNoType = formData.votingType === "yes-no"
  const isMultipleChoiceType = formData.votingType === "multiple-choice"

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
            <Link href="/communities" className="text-muted-foreground hover:text-foreground">
              Communities
            </Link>
            <Link href="/create-vote" className="text-foreground font-medium">
              Create Vote
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
              <h1 className="text-3xl font-bold">Create New Vote</h1>
              <p className="text-muted-foreground">Set up elections, proposals, or community decisions</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="mt-6">
                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Set up the fundamental details of your vote</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Vote Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., 'Community Leadership Election 2024' or 'Proposal: Increase Treasury Allocation'"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Provide detailed information about what this vote is for, the context, and any important details voters should know..."
                          rows={4}
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="community">Community *</Label>
                        <Select
                          value={formData.community}
                          onValueChange={(value) => handleInputChange("community", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select community" />
                          </SelectTrigger>
                          <SelectContent>
                            {communities.map((community) => (
                              <SelectItem key={community.value} value={community.value}>
                                {community.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="votingType">Voting Type *</Label>
                        <Select
                          value={formData.votingType}
                          onValueChange={(value) => handleInputChange("votingType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select voting type" />
                          </SelectTrigger>
                          <SelectContent>
                            {votingTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div>
                                  <div className="font-medium">{type.label}</div>
                                  <div className="text-xs text-muted-foreground">{type.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formData.votingType && (
                          <p className="text-sm text-muted-foreground">
                            {getVotingTypeDescription(formData.votingType)}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deadline">Voting Deadline *</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="deadline"
                            type="datetime-local"
                            value={formData.deadline}
                            onChange={(e) => handleInputChange("deadline", e.target.value)}
                            required
                          />
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Options Tab */}
                <TabsContent value="options" className="space-y-6">
                  {isElectionType && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Candidates
                        </CardTitle>
                        <CardDescription>Add candidates for this election</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {candidates.map((candidate, index) => (
                          <div key={candidate.id} className="p-4 border rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Candidate {index + 1}</h4>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCandidate(candidate.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Candidate Name *</Label>
                                <Input
                                  placeholder="Enter candidate name"
                                  value={candidate.name}
                                  onChange={(e) => updateCandidate(candidate.id, "name", e.target.value)}
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Profile Photo</Label>
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(candidate.id, e)}
                                    className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-muted file:text-muted-foreground"
                                  />
                                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                placeholder="Brief description of the candidate's background and qualifications"
                                rows={2}
                                value={candidate.description}
                                onChange={(e) => updateCandidate(candidate.id, "description", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Campaign Pitch (Optional)</Label>
                              <Textarea
                                placeholder="Candidate's campaign message, platform, or vision statement"
                                rows={3}
                                value={candidate.campaignPitch}
                                onChange={(e) => updateCandidate(candidate.id, "campaignPitch", e.target.value)}
                              />
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          onClick={addCandidate}
                          className="w-full bg-transparent"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Candidate
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {(isMultipleChoiceType || isYesNoType) && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Vote className="w-5 h-5" />
                          {isYesNoType ? "Proposal Details" : "Vote Options"}
                        </CardTitle>
                        <CardDescription>
                          {isYesNoType ? "This will be a Yes/No vote" : "Add options for voters to choose from"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {isYesNoType ? (
                          <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              This vote will have standard Yes/No/Abstain options. Voters will decide whether to approve
                              or reject the proposal described above.
                            </p>
                          </div>
                        ) : (
                          <>
                            {voteOptions.map((option, index) => (
                              <div key={option.id} className="p-4 border rounded-lg space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">Option {index + 1}</h4>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeVoteOption(option.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>

                                <div className="space-y-2">
                                  <Label>Option Title *</Label>
                                  <Input
                                    placeholder="Enter option title"
                                    value={option.title}
                                    onChange={(e) => updateVoteOption(option.id, "title", e.target.value)}
                                    required
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    placeholder="Describe what this option means or what it would accomplish"
                                    rows={2}
                                    value={option.description}
                                    onChange={(e) => updateVoteOption(option.id, "description", e.target.value)}
                                  />
                                </div>
                              </div>
                            ))}

                            <Button
                              type="button"
                              variant="outline"
                              onClick={addVoteOption}
                              className="w-full bg-transparent"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Option
                            </Button>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Voting Restrictions
                      </CardTitle>
                      <CardDescription>Configure who can vote and how</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">One Vote Per Wallet</label>
                          <p className="text-sm text-muted-foreground">Each wallet address can only vote once</p>
                        </div>
                        <Switch
                          checked={formData.restrictions.oneVotePerWallet}
                          onCheckedChange={(checked) => handleInputChange("restrictions.oneVotePerWallet", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Members Only</label>
                          <p className="text-sm text-muted-foreground">Only community members can participate</p>
                        </div>
                        <Switch
                          checked={formData.restrictions.membersOnly}
                          onCheckedChange={(checked) => handleInputChange("restrictions.membersOnly", checked)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="minimumTokens">Minimum Tokens Required (Optional)</Label>
                        <Input
                          id="minimumTokens"
                          type="number"
                          placeholder="0"
                          value={formData.restrictions.minimumTokens}
                          onChange={(e) => handleInputChange("restrictions.minimumTokens", e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum number of governance tokens required to vote
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">NFT Required</label>
                          <p className="text-sm text-muted-foreground">Require specific NFT ownership to vote</p>
                        </div>
                        <Switch
                          checked={formData.restrictions.nftRequired}
                          onCheckedChange={(checked) => handleInputChange("restrictions.nftRequired", checked)}
                        />
                      </div>

                      {formData.restrictions.nftRequired && (
                        <div className="space-y-2">
                          <Label htmlFor="nftContract">NFT Contract Address</Label>
                          <Input
                            id="nftContract"
                            placeholder="0x..."
                            value={formData.restrictions.nftContract}
                            onChange={(e) => handleInputChange("restrictions.nftContract", e.target.value)}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Results & Transparency</CardTitle>
                      <CardDescription>Configure when and how results are shown</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="resultsVisibility">Results Visibility</Label>
                        <Select
                          value={formData.resultsVisibility}
                          onValueChange={(value) => handleInputChange("resultsVisibility", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="live">Live Results</SelectItem>
                            <SelectItem value="after-deadline">Show After Deadline</SelectItem>
                            <SelectItem value="manual">Manual Reveal</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          {formData.resultsVisibility === "live" && "Results update in real-time as votes are cast"}
                          {formData.resultsVisibility === "after-deadline" &&
                            "Results shown only after voting deadline"}
                          {formData.resultsVisibility === "manual" && "Results revealed manually by administrators"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Allow Abstain</label>
                          <p className="text-sm text-muted-foreground">Allow voters to abstain from voting</p>
                        </div>
                        <Switch
                          checked={formData.allowAbstain}
                          onCheckedChange={(checked) => handleInputChange("allowAbstain", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Review Tab */}
                <TabsContent value="review" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Review & Create</CardTitle>
                      <CardDescription>Review your vote configuration before creating</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                          <h4 className="font-medium">Vote Details</h4>
                          <div className="text-sm space-y-1">
                            <p>
                              <span className="font-medium">Title:</span> {formData.title || "Not set"}
                            </p>
                            <p>
                              <span className="font-medium">Type:</span>{" "}
                              {votingTypes.find((vt) => vt.value === formData.votingType)?.label || "Not selected"}
                            </p>
                            <p>
                              <span className="font-medium">Community:</span>{" "}
                              {communities.find((c) => c.value === formData.community)?.label || "Not selected"}
                            </p>
                            <p>
                              <span className="font-medium">Deadline:</span>{" "}
                              {formData.deadline ? new Date(formData.deadline).toLocaleString() : "Not set"}
                            </p>
                          </div>
                        </div>

                        {isElectionType && (
                          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                            <h4 className="font-medium">Candidates ({candidates.length})</h4>
                            <div className="text-sm space-y-1">
                              {candidates.map((candidate, index) => (
                                <p key={candidate.id}>
                                  {index + 1}. {candidate.name || `Candidate ${index + 1}`}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {isMultipleChoiceType && (
                          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                            <h4 className="font-medium">Options ({voteOptions.length})</h4>
                            <div className="text-sm space-y-1">
                              {voteOptions.map((option, index) => (
                                <p key={option.id}>
                                  {index + 1}. {option.title || `Option ${index + 1}`}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                          <h4 className="font-medium">Settings</h4>
                          <div className="text-sm space-y-1">
                            <p>
                              <span className="font-medium">Results:</span>{" "}
                              {formData.resultsVisibility === "live"
                                ? "Live updates"
                                : formData.resultsVisibility === "after-deadline"
                                  ? "After deadline"
                                  : "Manual reveal"}
                            </p>
                            <p>
                              <span className="font-medium">Restrictions:</span>{" "}
                              {formData.restrictions.membersOnly ? "Members only" : "Open to all"}
                            </p>
                            <p>
                              <span className="font-medium">Abstain:</span>{" "}
                              {formData.allowAbstain ? "Allowed" : "Not allowed"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <Vote className="w-4 h-4 mr-2" />
                        Create Vote
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </form>
            </Tabs>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            {showPreview && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preview</CardTitle>
                  <CardDescription>How your vote will appear to voters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Vote Card Preview */}
                    <div className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{formData.title || "Vote Title"}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {formData.description || "Vote description will appear here..."}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {formData.deadline
                                  ? `Ends ${new Date(formData.deadline).toLocaleDateString()}`
                                  : "No deadline set"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>0 votes</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {votingTypes.find((vt) => vt.value === formData.votingType)?.label || "No type"}
                        </Badge>
                      </div>

                      <Separator />

                      {/* Preview voting options */}
                      <div className="space-y-2">
                        {isElectionType && candidates.length > 0 && (
                          <>
                            <h4 className="font-medium text-sm">Candidates</h4>
                            {candidates.slice(0, 3).map((candidate, index) => (
                              <div key={candidate.id} className="flex items-center space-x-3 p-2 border rounded">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback>{candidate.name?.slice(0, 2) || `C${index + 1}`}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{candidate.name || `Candidate ${index + 1}`}</span>
                              </div>
                            ))}
                            {candidates.length > 3 && (
                              <p className="text-xs text-muted-foreground">+{candidates.length - 3} more candidates</p>
                            )}
                          </>
                        )}

                        {isYesNoType && (
                          <>
                            <h4 className="font-medium text-sm">Options</h4>
                            <div className="space-y-1">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled
                                className="w-full justify-start bg-transparent"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Yes (0%)
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled
                                className="w-full justify-start bg-transparent"
                              >
                                <X className="w-4 h-4 mr-2" />
                                No (0%)
                              </Button>
                              {formData.allowAbstain && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled
                                  className="w-full justify-start bg-transparent"
                                >
                                  Abstain (0%)
                                </Button>
                              )}
                            </div>
                          </>
                        )}

                        {isMultipleChoiceType && voteOptions.length > 0 && (
                          <>
                            <h4 className="font-medium text-sm">Options</h4>
                            {voteOptions.slice(0, 3).map((option, index) => (
                              <Button
                                key={option.id}
                                size="sm"
                                variant="outline"
                                disabled
                                className="w-full justify-start bg-transparent"
                              >
                                {option.title || `Option ${index + 1}`} (0%)
                              </Button>
                            ))}
                            {voteOptions.length > 3 && (
                              <p className="text-xs text-muted-foreground">+{voteOptions.length - 3} more options</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Voting Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Write clear, unbiased descriptions for all candidates and options</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Set appropriate deadlines to allow sufficient voting time</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Consider your community's preferences for result visibility</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Use appropriate restrictions to ensure fair voting</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Voting Types Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Voting Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Single Choice</p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Best for elections where voters pick one candidate
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="font-medium text-green-900 dark:text-green-100 mb-1">Ranked Choice</p>
                    <p className="text-green-700 dark:text-green-300">
                      Voters rank candidates by preference for fairer outcomes
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="font-medium text-purple-900 dark:text-purple-100 mb-1">Yes/No</p>
                    <p className="text-purple-700 dark:text-purple-300">Traditional proposal voting for decisions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
