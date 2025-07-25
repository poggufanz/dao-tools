"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, Smile, Paperclip, Hash, Settings, Bell, Search, Phone, Video, Info } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

export default function ChatPage() {
  const router = useRouter()
  const [selectedChannel, setSelectedChannel] = useState("general")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "alice.eth",
      avatar: "/placeholder.svg?height=32&width=32&text=AE",
      message: "Hey everyone! Just wanted to share some thoughts on the new governance proposal.",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      user: "You",
      avatar: "/placeholder.svg?height=32&width=32&text=JD",
      message: "That's a great point Alice! I think the token distribution mechanism needs more discussion.",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      user: "bob.dao",
      avatar: "/placeholder.svg?height=32&width=32&text=BD",
      message:
        "I agree with both of you. We should also consider the long-term implications for smaller token holders.",
      timestamp: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      user: "carol.dev",
      avatar: "/placeholder.svg?height=32&width=32&text=CD",
      message:
        "Has anyone looked at how other DAOs have handled similar situations? Maybe we can learn from their experiences.",
      timestamp: "10:38 AM",
      isOwn: false,
    },
  ])

  const channels = [
    { id: "general", name: "general", unread: 0, type: "text" },
    { id: "governance", name: "governance", unread: 3, type: "text" },
    { id: "development", name: "development", unread: 1, type: "text" },
    { id: "announcements", name: "announcements", unread: 0, type: "text" },
    { id: "random", name: "random", unread: 0, type: "text" },
  ]

  const onlineMembers = [
    { id: 1, name: "alice.eth", avatar: "/placeholder.svg?height=24&width=24&text=AE", status: "online" },
    { id: 2, name: "bob.dao", avatar: "/placeholder.svg?height=24&width=24&text=BD", status: "online" },
    { id: 3, name: "carol.dev", avatar: "/placeholder.svg?height=24&width=24&text=CD", status: "online" },
    { id: 4, name: "david.web3", avatar: "/placeholder.svg?height=24&width=24&text=DW", status: "away" },
    { id: 5, name: "eve.crypto", avatar: "/placeholder.svg?height=24&width=24&text=EC", status: "online" },
  ]

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: "You",
        avatar: "/placeholder.svg?height=32&width=32&text=JD",
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/30 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">DT</span>
            </div>
            <span className="font-semibold">DeFi Builders</span>
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Channels</h3>
              <Button variant="ghost" size="icon" className="w-4 h-4">
                <Settings className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {channels.map((channel) => (
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
                    <Badge className="w-5 h-5 flex items-center justify-center p-0 text-xs">{channel.unread}</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Online Members */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Online — {onlineMembers.filter((m) => m.status === "online").length}
              </h3>
            </div>
            <div className="space-y-2">
              {onlineMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <div className="relative">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(".")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                        member.status === "online" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex items-center space-x-2">
                <Hash className="w-5 h-5 text-muted-foreground" />
                <h1 className="text-lg font-semibold">{selectedChannel}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="w-4 h-4" />
              </Button>
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

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex space-x-3 ${msg.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.user} />
                  <AvatarFallback>
                    {msg.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 ${msg.isOwn ? "text-right" : ""}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                  </div>
                  <div
                    className={`inline-block max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                      msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Button type="button" variant="ghost" size="icon">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message #${selectedChannel}`}
              className="flex-1"
            />
            <Button type="button" variant="ghost" size="icon">
              <Smile className="w-4 h-4" />
            </Button>
            <Button type="submit" size="icon" disabled={!message.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
