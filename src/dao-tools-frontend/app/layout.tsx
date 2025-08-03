import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Web3Provider } from "@/components/web3-provider"
import { InternetIdentityProvider } from "@/contexts/InternetIdentityProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OpenVote - Transparent Voting for Everyone",
  description: "Create proposals, vote transparently, and empower communities — whether you're Web2 or Web3",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <InternetIdentityProvider>
            <Web3Provider>{children}</Web3Provider>
          </InternetIdentityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
