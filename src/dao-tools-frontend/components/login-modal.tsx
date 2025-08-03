"use client"

import { useState, useEffect } from "react"
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { useInternetIdentity } from '@/contexts/InternetIdentityProvider'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Mail, CheckCircle, Shield, User, LogOut } from "lucide-react"

// Google icon component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

// Internet Computer icon component
const InternetComputerIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (method: string, identity: string) => void
}

interface LoginState {
  isLoggedIn: boolean
  method: string
  identity: string
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { identity, isAuthenticated, login: iiLogin, logout: iiLogout } = useInternetIdentity()

  useEffect(() => {
    if (isConnected && address) {
      onLogin("wallet", address)
      onClose()
    }
  }, [isConnected, address, onLogin, onClose])

  useEffect(() => {
    if (isAuthenticated && identity) {
      onLogin("internet-identity", identity.getPrincipal().toText())
      onClose()
    }
  }, [isAuthenticated, identity, onLogin, onClose])


  const handleLogin = async (method: string) => {
    setIsLoading(method)

    if (method === 'wallet') {
      await open()
      // The useEffect will handle the rest
      setIsLoading(null)
      return;
    }
    if (method === 'internet-identity') {
      await iiLogin()
      // The useEffect will handle the rest
      setIsLoading(null)
      return;
    }

    // Simulate authentication delay for other methods
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock authentication responses
    let identity = ""
    switch (method) {
      case "internet-identity":
        identity = "rdmx6-jaaaa-aaaah-qcaiq-cai"
        break
      // case "wallet": // This is now handled by Web3Modal
      //   identity = "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4"
      //   break
      case "google":
        identity = "alice.johnson@gmail.com"
        break
      case "email":
        identity = "alice@university.edu"
        break
    }

    setIsLoading(null)
    if (identity) {
        onLogin(method, identity)
        onClose()
    }
  }

  const loginMethods = [
    {
      id: "internet-identity",
      label: "Login with Internet Identity",
      icon: InternetComputerIcon,
      description: "Decentralized authentication",
      primary: true,
    },
    {
      id: "wallet",
      label: "Login with Wallet",
      icon: Wallet,
      description: "MetaMask, WalletConnect, etc.",
      primary: true,
    },
    {
      id: "google",
      label: "Login with Google",
      icon: GoogleIcon,
      description: "Quick social login",
      primary: false,
    },
    {
      id: "email",
      label: "Login with Email",
      icon: Mail,
      description: "Traditional email login",
      primary: false,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">DT</span>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold">Login to OpenVote</DialogTitle>
          <DialogDescription className="text-base">Choose your preferred login method</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Primary login methods */}
          <div className="space-y-3">
            {loginMethods
              .filter((method) => method.primary)
              .map((method) => (
                <Button
                  key={method.id}
                  variant="outline"
                  className="w-full h-12 justify-start gap-3 text-left bg-transparent"
                  onClick={() => handleLogin(method.id)}
                  disabled={isLoading !== null}
                >
                  {isLoading === method.id ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <method.icon />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{method.label}</div>
                    <div className="text-xs text-muted-foreground">{method.description}</div>
                  </div>
                </Button>
              ))}
          </div>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Secondary login methods */}
          <div className="space-y-3">
            {loginMethods
              .filter((method) => !method.primary)
              .map((method) => (
                <Button
                  key={method.id}
                  variant="outline"
                  className="w-full h-12 justify-start gap-3 text-left bg-transparent"
                  onClick={() => handleLogin(method.id)}
                  disabled={isLoading !== null}
                >
                  {isLoading === method.id ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <method.icon />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{method.label}</div>
                    <div className="text-xs text-muted-foreground">{method.description}</div>
                  </div>
                </Button>
              ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            We use decentralized authentication when available
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Success state component
interface UserProfileProps {
  loginState: LoginState
  onLogout: () => void
}

export function UserProfile({ loginState, onLogout }: UserProfileProps) {
  const { disconnect } = useDisconnect()
  const { logout: iiLogout } = useInternetIdentity()

  if (!loginState.isLoggedIn) return null

  const handleLogout = () => {
    if (loginState.method === 'wallet') {
      disconnect()
    }
    if (loginState.method === 'internet-identity') {
      iiLogout()
    }
    onLogout()
  }

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "internet-identity":
        return "Internet Identity"
      case "wallet":
        return "Wallet"
      case "google":
        return "Google"
      case "email":
        return "Email"
      default:
        return method
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "internet-identity":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "wallet":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "google":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "email":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const formatIdentity = (identity: string) => {
    if (identity.length > 20) {
      return `${identity.slice(0, 8)}...${identity.slice(-8)}`
    }
    return identity
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-3">
        <div className="flex items-center justify-center mb-2">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-lg">Successfully Logged In</CardTitle>
        <CardDescription>Welcome to OpenVote</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <User className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Logged in as</p>
            <p className="text-sm text-muted-foreground font-mono truncate">{formatIdentity(loginState.identity)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Method:</span>
            <Badge className={getMethodColor(loginState.method)}>{getMethodLabel(loginState.method)}</Badge>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1 bg-transparent">
            <LogOut className="w-3 h-3" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
