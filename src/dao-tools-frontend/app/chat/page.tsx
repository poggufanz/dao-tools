"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Hash, Settings, Search, MoreVertical, Bell, Smile, Paperclip, Phone, Video } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [selectedChannel, setSelectedChannel] = useState("general")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data for communities and channels
  const communities = [
    {
      id: 1,
      name: "DeFi Builders",
      logo: "/placeholder.svg?height=32&width=32&text=DB",
      channels: [
        { id: "general", name: "general", unread: 3 },
        { id: "governance", name: "governance", unread: 0 },
        { id: "development", name: "development", unread: 1 },
        { id: "announcements", name: "announcements", unread: 0 },
      ],
    },
    {
      id: 2,
      name: "University DAO",
      logo: "/placeholder.svg?height=32&width=32&text=UD",
      channels: [
        { id: "general-uni", name: "general", unread: 0 },
        { id: "student-gov", name: "student-gov", unread: 2 },
        { id: "events", name: "events", unread: 0 },
      ],
    },
  ]

  // Mock messages
  const messages = [
    {
      id: 1,
      author: "alice.eth",
      avatar: "/placeholder.svg?height=32&width=32&text=AE",
      content: "Hey everyone! Just deployed the new liquidity pool contract. Testing went smoothly 🚀",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      author: "bob.dao",
      avatar: "/placeholder.svg?height=32&width=32&text=BD",
      content: "Awesome work Alice! What's the APY looking like?",
      timestamp: "10:32 AM",
      isOwn: false,
    },
    {
      id: 3,
      author: "You",
      avatar: "/placeholder.svg?height=32&width=32&text=JD",
      content: "This is exciting! Can't wait to see the community's response to the new features.",
      timestamp: "10:35 AM",
      isOwn: true,
    },
    {
      id: 4,
      author: "carol.dev",
      avatar: "/placeholder.svg?height=32&width=32&text=CD",
      content: "I've been testing the UI and it's looking great. The user experience is much smoother now.",
      timestamp: "10:38 AM",
      isOwn: false,
    },
    {
      id: 5,
      author: "alice.eth",
      avatar: "/placeholder.svg?height=32&width=32&text=AE",
      content:
        "Thanks for the feedback everyone! The APY is currently sitting at around 12-15% depending on the pool. We'll monitor it closely over the next few days.",
      timestamp: "10:40 AM",
      isOwn: false,
    },
  ]

  // Mock online members
  const onlineMembers = [
    { id: 1, name: "alice.eth", avatar: "/placeholder.svg?height=24&width=24&text=AE", status: "online" },
    { id: 2, name: "bob.dao", avatar: "/placeholder.svg?height=24&width=24&text=BD", status: "online" },
    { id: 3, name: "carol.dev", avatar: "/placeholder.svg?height=24&width=24&text=CD", status: "away" },
    { id: 4, name: "david.web3", avatar: "/placeholder.svg?height=24&width=24&text=DW", status: "online" },
    { id: 5, name: "eve.crypto", avatar: "/placeholder.svg?height=24&width=24&text=EC", status: "offline" },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-muted/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DT</span>
              </div>
              <span className="font-bold">DAO Tools</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
                <Link href="/notifications">
                  <Bell className="w-4 h-4" />
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search communities..." className="pl-10 h-9" />
          </div>
        </div>

        {/* Communities and Channels */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {communities.map((community) => (
              <div key={community.id} className="mb-4">
                <div className="flex items-center space-x-2 px-2 py-1 mb-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={community.logo || "/placeholder.svg"} alt={community.name} />
                    <AvatarFallback className="text-xs">{community.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">{community.name}</span>
                </div>

                <div className="space-y-1 ml-2">
                  {community.channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm hover:bg-muted/50 transition-colors ${
                        selectedChannel === channel.id ? "bg-muted text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4" />
                        <span>{channel.name}</span>
                      </div>
                      {channel.unread > 0 && (
                        <Badge
                          variant="secondary"
                          className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center"
                        >
                          {channel.unread}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">john.doe</div>
              <div className="text-xs text-muted-foreground">Online</div>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-muted-foreground" />
              <div>
                <h2 className="font-semibold">general</h2>
                <p className="text-sm text-muted-foreground">DeFi Builders Community Chat</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex">
          {/* Messages */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex space-x-3 ${msg.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.author} />
                      <AvatarFallback>{msg.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${msg.isOwn ? "text-right" : ""}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{msg.author}</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <div
                        className={`inline-block p-3 rounded-lg max-w-[70%] ${
                          msg.isOwn ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button type="submit" size="icon" disabled={!message.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Online Members Sidebar */}
          <div className="w-64 border-l bg-muted/30">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Members</h3>
                <Badge variant="secondary">{onlineMembers.length}</Badge>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Online — {onlineMembers.filter((m) => m.status === "online").length}
                </div>
                {onlineMembers
                  .filter((m) => m.status === "online")
                  .map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-xs">{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                        />
                      </div>
                      <span className="text-sm truncate">{member.name}</span>
                    </div>
                  ))}

                {onlineMembers.filter((m) => m.status === "away").length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Away — {onlineMembers.filter((m) => m.status === "away").length}
                    </div>
                    {onlineMembers
                      .filter((m) => m.status === "away")
                      .map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50 cursor-pointer opacity-60"
                        >
                          <div className="relative">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback className="text-xs">
                                {member.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                            />
                          </div>
                          <span className="text-sm truncate">{member.name}</span>
                        </div>
                      ))}
                  </>
                )}

                {onlineMembers.filter((m) => m.status === "offline").length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Offline — {onlineMembers.filter((m) => m.status === "offline").length}
                    </div>
                    {onlineMembers
                      .filter((m) => m.status === "offline")
                      .map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50 cursor-pointer opacity-40"
                        >
                          <div className="relative">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback className="text-xs">
                                {member.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                            />
                          </div>
                          <span className="text-sm truncate">{member.name}</span>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
