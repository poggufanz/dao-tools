"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginModal, UserProfile } from "@/components/login-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

interface LoginState {
  isLoggedIn: boolean
  method: string
  identity: string
}

export default function LoginDemo() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loginState, setLoginState] = useState<LoginState>({
    isLoggedIn: false,
    method: "",
    identity: "",
  })

  const handleLogin = (method: string, identity: string) => {
    setLoginState({
      isLoggedIn: true,
      method,
      identity,
    })
  }

  const handleLogout = () => {
    setLoginState({
      isLoggedIn: false,
      method: "",
      identity: "",
    })
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
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/login-demo" className="text-foreground font-medium">
              Login Demo
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {!loginState.isLoggedIn ? (
              <Button onClick={() => setIsLoginModalOpen(true)}>Sign In</Button>
            ) : (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Login Interface Demo</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Experience our multi-method authentication system for DAO Tools
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-8">
          {/* Login Trigger */}
          {!loginState.isLoggedIn && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Try the Login Experience</CardTitle>
                <CardDescription>
                  Click below to open the login modal and test different authentication methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsLoginModalOpen(true)} className="w-full" size="lg">
                  Open Login Modal
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Success State */}
          {loginState.isLoggedIn && <UserProfile loginState={loginState} onLogout={handleLogout} />}

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication Methods</CardTitle>
              <CardDescription>DAO Tools supports multiple login options for maximum accessibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Internet Identity - Decentralized authentication</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Crypto Wallets - MetaMask, WalletConnect</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Google OAuth - Quick social login</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Email - Traditional authentication</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
    </div>
  )
}
