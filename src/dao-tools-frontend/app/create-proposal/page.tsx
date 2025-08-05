"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Upload, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Add this import at the top
import { ThemeToggle } from "@/components/theme-toggle"

export default function CreateProposal() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    expirationDate: "",
    votingMethod: "",
    file: null as File | null,
  })

  const [showPreview, setShowPreview] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Proposal submitted:", formData)
    alert("Proposal created successfully!")
  }

  const getVotingMethodDescription = (method: string) => {
    switch (method) {
      case "one-person-one-vote":
        return "Each verified user gets exactly one vote"
      case "token-based":
        return "Voting power based on token holdings"
      case "quadratic":
        return "Cost of additional votes increases quadratically"
      default:
        return ""
    }
  }

  const getVotingMethodColor = (method: string) => {
    switch (method) {
      case "one-person-one-vote":
        return "bg-blue-100 text-blue-800"
      case "token-based":
        return "bg-green-100 text-green-800"
      case "quadratic":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Create New Proposal</h1>
              <p className="text-muted-foreground mt-2">Submit a proposal for community voting</p>
            </div>
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Proposal Details</CardTitle>
                <CardDescription>Fill in the details for your proposal</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Proposal Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter a clear, descriptive title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide detailed information about your proposal, including rationale and expected outcomes..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Supporting Document (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                        className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-muted file:text-muted-foreground"
                      />
                      <Upload className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Upload PDF, PNG, or JPG files (max 10MB)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiration">Proposal Expiration *</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="expiration"
                        type="datetime-local"
                        value={formData.expirationDate}
                        onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                        required
                      />
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="voting-method">Voting Method *</Label>
                    <Select
                      value={formData.votingMethod}
                      onValueChange={(value) => handleInputChange("votingMethod", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select voting method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-person-one-vote">One Person One Vote</SelectItem>
                        <SelectItem value="token-based">Token-Based Voting</SelectItem>
                        <SelectItem value="quadratic">Quadratic Voting</SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.votingMethod && (
                      <p className="text-sm text-muted-foreground">
                        {getVotingMethodDescription(formData.votingMethod)}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Create Proposal
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/dashboard">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Preview */}
            {showPreview && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>How your proposal will appear to voters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{formData.title || "Proposal Title"}</h3>
                        <p className="text-muted-foreground mb-3">
                          {formData.description || "Proposal description will appear here..."}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Created by You</span>
                          {formData.expirationDate && (
                            <span>Expires: {new Date(formData.expirationDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      {formData.votingMethod && (
                        <Badge className={getVotingMethodColor(formData.votingMethod)}>
                          {formData.votingMethod === "one-person-one-vote" && "One-Person-One-Vote"}
                          {formData.votingMethod === "token-based" && "Token Vote"}
                          {formData.votingMethod === "quadratic" && "Quadratic"}
                        </Badge>
                      )}
                    </div>

                    <Separator />

                    {formData.file && (
                      <div className="flex items-center gap-2 text-sm">
                        <Upload className="w-4 h-4" />
                        <span>Attachment: {formData.file.name}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" disabled>
                        Yes (0)
                      </Button>
                      <Button size="sm" variant="outline" disabled>
                        No (0)
                      </Button>
                      <Button size="sm" variant="outline" disabled>
                        Abstain (0)
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Results (0 votes)</span>
                        <span>0% Yes</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
