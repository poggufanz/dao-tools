'use client'

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Coins, Settings, School, Building, Rocket, Globe } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useDisconnect } from 'wagmi'
import { LoginModal } from "@/components/login-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthProvider"

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { isAuthenticated, identity, logout } = useAuth()

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Secure Voting",
      description: "Cryptographically secure voting with transparent results",
    },
    {
      icon: Users,
      title: "Multiple Login Methods",
      description: "Email, Web3 wallets, or institutional authentication",
    },
    {
      icon: Coins,
      title: "NFT Verification",
      description: "Token-gated voting and identity verification",
    },
    {
      icon: Settings,
      title: "Admin Tools",
      description: "Comprehensive management and moderation controls",
    },
  ]

  const useCases = [
    {
      icon: School,
      title: "Schools & Universities",
      description: "Student government elections and academic voting",
    },
    {
      icon: Building,
      title: "Startups",
      description: "Team decisions and equity holder voting",
    },
    {
      icon: Rocket,
      title: "DAOs",
      description: "Decentralized governance and proposal voting",
    },
    {
      icon: Globe,
      title: "Communities",
      description: "Local organizations and community decisions",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Web3 & Web2 Compatible
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Transparent Voting for Everyone</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create proposals, vote transparently, and empower communities — whether you're Web2 or Web3
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">Try Now</Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run transparent, secure voting for any organization
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Who Can Use OpenVote?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From traditional organizations to Web3 communities, we support all types of governance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <useCase.icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of organizations using OpenVote for transparent governance
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/dashboard">Start Voting Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">DT</span>
                </div>
                <span className="text-xl font-bold">OpenVote</span>
              </div>
              <p className="text-muted-foreground">Transparent voting for everyone, everywhere.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 OpenVote. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  )
}
