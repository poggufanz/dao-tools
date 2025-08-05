"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Vote, MessageCircle, CheckCircle, X, Settings, ArrowLeft, Clock, Heart, UserPlus } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "proposal",
      title: "New proposal in DeFi Builders",
      description: "Implement New Governance Token Distribution",
      author: "alice.eth",
      avatar: "/placeholder.svg?height=32&width=32&text=AE",
      timestamp: "2 hours ago",
      isRead: false,
      community: "DeFi Builders",
      action: "Vote now",
    },
    {
      id: 2,
      type: "comment",
      title: "New comment on your post",
      description: "bob.dao commented: 'Great insights on the liquidity mining program!'",
      author: "bob.dao",
      avatar: "/placeholder.svg?height=32&width=32&text=BD",
      timestamp: "4 hours ago",
      isRead: false,
      community: "DeFi Builders",
      action: "View comment",
    },
    {
      id: 3,
      type: "member",
      title: "New member joined University DAO",
      description: "carol.student has joined the community",
      author: "carol.student",
      avatar: "/placeholder.svg?height=32&width=32&text=CS",
      timestamp: "6 hours ago",
      isRead: true,
      community: "University DAO",
      action: "Welcome",
    },
    {
      id: 4,
      type: "vote",
      title: "Proposal voting ended",
      description: "Fund Development of Mobile App - Proposal passed with 65% approval",
      author: "System",
      avatar: "/placeholder.svg?height=32&width=32&text=SY",
      timestamp: "1 day ago",
      isRead: true,
      community: "DeFi Builders",
      action: "View results",
    },
    {
      id: 5,
      type: "like",
      title: "Your post received likes",
      description: "5 members liked your post about smart contract security",
      author: "Multiple users",
      avatar: "/placeholder.svg?height=32&width=32&text=❤️",
      timestamp: "1 day ago",
      isRead: true,
      community: "Developer Collective",
      action: "View post",
    },
    {
      id: 6,
      type: "mention",
      title: "You were mentioned in a discussion",
      description: "david.web3 mentioned you in #governance channel",
      author: "david.web3",
      avatar: "/placeholder.svg?height=32&width=32&text=DW",
      timestamp: "2 days ago",
      isRead: true,
      community: "DeFi Builders",
      action: "View message",
    },
  ]

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
      case "mention":
        return <MessageCircle className="w-4 h-4 text-orange-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    switch (activeTab) {
      case "unread":
        return !notification.isRead
      case "proposals":
        return notification.type === "proposal" || notification.type === "vote"
      case "social":
        return notification.type === "comment" || notification.type === "like" || notification.type === "mention"
      default:
        return true
    }
  })

  const handleMarkAsRead = (notificationId: number) => {
    console.log("Marking as read:", notificationId)
  }

  const handleMarkAllAsRead = () => {
    console.log("Marking all as read")
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">Stay updated with your community activities</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Notification Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge className="ml-2 w-5 h-5 flex items-center justify-center p-0 text-xs">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 w-5 h-5 flex items-center justify-center p-0 text-xs">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md ${
                    !notification.isRead ? "ring-2 ring-primary/20 bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-sm">{notification.title}</h3>
                              {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{notification.timestamp}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {notification.community}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <Button variant="outline" size="sm">
                              {notification.action}
                            </Button>
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="w-8 h-8">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === "unread"
                      ? "You're all caught up! No unread notifications."
                      : "You don't have any notifications in this category yet."}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Notification Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Notification Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Proposals</h4>
                  <p className="text-sm text-muted-foreground">Get notified when new proposals are created</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Comments & Mentions</h4>
                  <p className="text-sm text-muted-foreground">Get notified when someone comments or mentions you</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Community Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified about community announcements and updates
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
