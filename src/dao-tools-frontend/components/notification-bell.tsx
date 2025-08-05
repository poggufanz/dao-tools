'use client'

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthProvider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Vote, MessageCircle, CheckCircle, X, Settings, ArrowRight, Heart, UserPlus } from "lucide-react"

export function NotificationBell() {
  const { isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "proposal",
      title: "New proposal in DeFi Builders",
      description: "Implement New Governance Token Distribution",
      timestamp: "2 hours ago",
      isRead: false,
      community: "DeFi Builders",
    },
    {
      id: 2,
      type: "comment",
      title: "New comment on your post",
      description: "bob.dao commented: 'Great insights on the liquidity mining program!'",
      timestamp: "4 hours ago",
      isRead: false,
      community: "DeFi Builders",
    },
    {
      id: 3,
      type: "member",
      title: "New member joined University DAO",
      description: "carol.student has joined the community",
      timestamp: "6 hours ago",
      isRead: true,
      community: "University DAO",
    },
    {
      id: 4,
      type: "vote",
      title: "Proposal voting ended",
      description: "Fund Development of Mobile App - Proposal passed with 65% approval",
      timestamp: "1 day ago",
      isRead: true,
      community: "DeFi Builders",
    },
    {
      id: 5,
      type: "like",
      title: "Your post received likes",
      description: "5 members liked your post about smart contract security",
      timestamp: "1 day ago",
      isRead: true,
      community: "Developer Collective",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length

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

  if (!isAuthenticated) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
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
            {notifications.length > 0 ? (
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 border-transparent ${!notification.isRead ? "bg-primary/5" : "bg-muted/30"} hover:bg-muted/50 transition-colors cursor-pointer group`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
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
                        className="w-6 h-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
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
        {notifications.length > 0 && (
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
  )
}