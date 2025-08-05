'use client'

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { useState, useCallback } from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Web3Provider } from "@/components/web3-provider"
import { AuthProvider, useAuth } from "@/contexts/AuthProvider"
import { InternetIdentityProvider } from "@/contexts/InternetIdentityProvider"
import { Button } from "@/components/ui/button"
import { LoginModal } from "@/components/login-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationBell } from "@/components/notification-bell"

const inter = Inter({ subsets: ["latin"] })

// This component handles the user navigation logic in the header
function UserNav() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { isAuthenticated, identity, logout } = useAuth()

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false)
  }, [])

  if (!isAuthenticated || !identity) {
    return (
      <>
        <Button onClick={() => setIsLoginModalOpen(true)}>Sign In</Button>
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </>
    )
  }

  const formatIdentity = (id: string) => {
    if (id.length > 12) {
      return `${id.slice(0, 6)}...${id.slice(-4)}`
    }
    return id
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${identity}.png`} alt="User" />
            <AvatarFallback>{identity[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Logged in as</p>
            <p className="text-xs leading-none text-muted-foreground font-mono">
              {formatIdentity(identity)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">OV</span>
              </div>
              <span className="text-xl font-bold">OpenVote</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/communities" className="text-muted-foreground hover:text-foreground transition-colors">
                Communities
              </Link>
              <Link href="/governance-explorer" className="text-muted-foreground hover:text-foreground transition-colors">
                Explorer
              </Link>
              <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                Chat
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground px-0">
                    Create
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/create-proposal">Create Proposal</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/create-vote">Create Vote</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <NotificationBell />
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 OpenVote. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <InternetIdentityProvider>
            <Web3Provider>
              <AuthProvider>
                <MainLayout>{children}</MainLayout>
              </AuthProvider>
            </Web3Provider>
          </InternetIdentityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}