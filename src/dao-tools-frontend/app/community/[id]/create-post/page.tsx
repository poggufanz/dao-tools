"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, FileText, ImageIcon, LinkIcon } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CreatePostPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Post submitted:", formData)
    // Handle post submission
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/community/1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Community
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <p className="text-muted-foreground">Share your thoughts with the DeFi Builders community</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>Create engaging content for your community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Post Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter an engaging title for your post"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Share your thoughts, insights, or updates with the community..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={8}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <Input
                      id="tags"
                      placeholder="defi, governance, development (comma separated)"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Add relevant tags to help others discover your post</p>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <div className="flex space-x-2">
                      <Button type="button" variant="outline" size="sm">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Add Link
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground ml-auto">Rich formatting coming soon</span>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button type="submit" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      Publish Post
                    </Button>
                    <Button type="button" variant="outline">
                      Save Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">john.doe</span>
                        <span className="text-xs text-muted-foreground">now</span>
                      </div>
                      <h3 className="font-medium text-sm mt-1">
                        {formData.title || "Your post title will appear here"}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formData.content || "Your post content will appear here..."}
                      </p>
                      {formData.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.tags.split(",").map((tag, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                              #{tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Keep discussions relevant to DeFi and blockchain technology</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Be respectful and constructive in your communications</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Share valuable insights and resources with the community</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Use appropriate tags to help others find your content</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">DeFi Builders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Members</span>
                    <span className="text-sm font-medium">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Your Posts</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Likes</span>
                    <span className="text-sm font-medium">156</span>
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
