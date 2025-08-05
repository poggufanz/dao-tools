"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, Settings, Shield, CheckCircle, XCircle, UserCheck } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data
const mockUsers = [
  {
    id: 1,
    identity: "alice@university.edu",
    role: "Student",
    verification: "Email Verified",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    identity: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    role: "DAO Member",
    verification: "NFT Verified",
    status: "Active",
    joinDate: "2024-02-03",
  },
  {
    id: 3,
    identity: "bob.smith@startup.com",
    role: "Admin",
    verification: "Manual Approval",
    status: "Pending",
    joinDate: "2024-03-10",
  },
]

const mockStats = {
  totalProposals: 47,
  activeVoters: 1234,
  pendingRequests: 8,
}

export default function AdminPanel() {
  const [users, setUsers] = useState(mockUsers)
  const [systemSettings, setSystemSettings] = useState({
    quadraticVoting: true,
    nftAccess: false,
    manualApproval: true,
  })

  const handleUserAction = (userId: number, action: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          switch (action) {
            case "verify":
              return { ...user, verification: "Verified", status: "Active" }
            case "revoke":
              return { ...user, status: "Suspended" }
            case "admin":
              return { ...user, role: "Admin" }
            default:
              return user
          }
        }
        return user
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getVerificationIcon = (verification: string) => {
    switch (verification) {
      case "Email Verified":
      case "Verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "NFT Verified":
        return <Shield className="w-4 h-4 text-blue-600" />
      case "Manual Approval":
        return <UserCheck className="w-4 h-4 text-orange-600" />
      default:
        return <XCircle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalProposals}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Voters</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeVoters.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingRequests}</div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="proposals" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Proposal Control
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              System Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user verification, roles, and access permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Identity</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Verification</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono text-sm">
                          {user.identity.length > 20 ? `${user.identity.slice(0, 20)}...` : user.identity}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getVerificationIcon(user.verification)}
                            <span className="text-sm">{user.verification}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, "verify")}
                              disabled={user.verification === "Verified"}
                            >
                              Verify
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, "admin")}
                              disabled={user.role === "Admin"}
                            >
                              Make Admin
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleUserAction(user.id, "revoke")}>
                              Suspend
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Control</CardTitle>
                <CardDescription>Monitor and moderate active proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Proposal management features coming soon</p>
                  <p className="text-sm">View, moderate, and manage all proposals from this panel</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure voting methods and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Quadratic Voting</label>
                    <p className="text-sm text-muted-foreground">Allow proposals to use quadratic voting mechanism</p>
                  </div>
                  <Switch
                    checked={systemSettings.quadraticVoting}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, quadraticVoting: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable NFT-based Access</label>
                    <p className="text-sm text-muted-foreground">Require NFT ownership for voting eligibility</p>
                  </div>
                  <Switch
                    checked={systemSettings.nftAccess}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, nftAccess: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Manual Approval</label>
                    <p className="text-sm text-muted-foreground">Require admin approval for new user registrations</p>
                  </div>
                  <Switch
                    checked={systemSettings.manualApproval}
                    onCheckedChange={(checked) => setSystemSettings((prev) => ({ ...prev, manualApproval: checked }))}
                  />
                </div>

                <div className="pt-4">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
