"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Search,
  Vote,
  FileText,
  Calendar,
  Users,
  TrendingUp,
  ExternalLink,
  Copy,
  CheckCircle,
  X,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock ICP-based governance transaction data
const mockTransactions = [
  {
    id: 1,
    type: "Proposal",
    timestamp: "2024-03-15T14:30:00Z",
    proposalTitle: "Implement New Governance Token Distribution",
    author: "0xA3F2...1F8D",
    txHash: "0x7b4f8c2a9e1d3f6b8c4e7a2d5f9b3c6e8a1d4f7b2c5e8a3d6f9b2c5e8a1d4f7b",
    status: "Executed",
    blockNumber: 2847392,
    gasUsed: "0.0012 ICP",
    canisterId: "rrkah-fqaaa-aaaah-qcpba-cai",
    details: {
      description:
        "This proposal aims to implement a new governance token distribution mechanism that will better align incentives between token holders and the protocol's long-term success.",
      votingResults: {
        yes: { votes: 450, percentage: 65, power: "2,340,000 tokens" },
        no: { votes: 242, percentage: 35, power: "1,260,000 tokens" },
        totalVotes: 692,
        totalPower: "3,600,000 tokens",
        quorum: "20%",
        threshold: "Simple majority",
      },
      timeline: {
        created: "2024-03-10T09:00:00Z",
        votingStarted: "2024-03-12T09:00:00Z",
        votingEnded: "2024-03-15T09:00:00Z",
        executed: "2024-03-15T14:30:00Z",
      },
    },
  },
  {
    id: 2,
    type: "Vote",
    timestamp: "2024-03-14T16:45:00Z",
    proposalTitle: "Fund Development of Mobile App",
    author: "0xB7E3...9A2C",
    txHash: "0x3c8f1b4e7a2d5f9b6c3e8a1d4f7b2c5e8a3d6f9b2c5e8a1d4f7b3c6e9a2d5f8b",
    status: "Confirmed",
    blockNumber: 2846891,
    gasUsed: "0.0008 ICP",
    canisterId: "rrkah-fqaaa-aaaah-qcpba-cai",
    details: {
      voteChoice: "Yes",
      votingPower: "15,000 tokens",
      proposalDescription:
        "Proposal to allocate $50,000 from the treasury to develop a mobile application for better community engagement.",
      voterReason:
        "I believe a mobile app will significantly improve user engagement and accessibility for our community members.",
    },
  },
  {
    id: 3,
    type: "Proposal",
    timestamp: "2024-03-12T11:20:00Z",
    proposalTitle: "Establish Community Code of Conduct",
    author: "0xC9D4...7B5E",
    txHash: "0x9e2d5f8b1c4e7a3d6f9b2c5e8a1d4f7b3c6e9a2d5f8b1c4e7a3d6f9b2c5e8a1d",
    status: "Pending",
    blockNumber: 2845234,
    gasUsed: "0.0015 ICP",
    canisterId: "rrkah-fqaaa-aaaah-qcpba-cai",
    details: {
      description:
        "This proposal aims to establish a comprehensive code of conduct for our community to ensure a safe, inclusive, and productive environment for all members.",
      currentVotes: {
        yes: { votes: 123, percentage: 72, power: "890,000 tokens" },
        no: { votes: 48, percentage: 28, power: "340,000 tokens" },
        totalVotes: 171,
        totalPower: "1,230,000 tokens",
      },
      timeline: {
        created: "2024-03-10T11:20:00Z",
        votingStarted: "2024-03-12T11:20:00Z",
        votingEnds: "2024-03-17T11:20:00Z",
      },
    },
  },
  {
    id: 4,
    type: "Vote",
    timestamp: "2024-03-11T09:15:00Z",
    proposalTitle: "Partnership with Green Energy Initiative",
    author: "0xD5F8...3C7A",
    txHash: "0x1d4f7b3c6e9a2d5f8b1c4e7a3d6f9b2c5e8a1d4f7b3c6e9a2d5f8b1c4e7a3d6f",
    status: "Confirmed",
    blockNumber: 2843567,
    gasUsed: "0.0009 ICP",
    canisterId: "rrkah-fqaaa-aaaah-qcpba-cai",
    details: {
      voteChoice: "No",
      votingPower: "8,500 tokens",
      proposalDescription:
        "Proposal to establish a strategic partnership with the Global Green Energy Initiative to collaborate on sustainable blockchain solutions.",
      voterReason:
        "While I support green initiatives, I believe we need more detailed financial projections before committing to this partnership.",
    },
  },
  {
    id: 5,
    type: "Proposal",
    timestamp: "2024-03-08T13:45:00Z",
    proposalTitle: "Increase Community Treasury Allocation",
    author: "0xE8A1...6D9B",
    txHash: "0x4f7b3c6e9a2d5f8b1c4e7a3d6f9b2c5e8a1d4f7b3c6e9a2d5f8b1c4e7a3d6f9b",
    status: "Executed",
    blockNumber: 2841892,
    gasUsed: "0.0011 ICP",
    canisterId: "rrkah-fqaaa-aaaah-qcpba-cai",
    details: {
      description:
        "Proposal to increase the community treasury allocation from 15% to 25% of protocol fees to fund more community initiatives, grants, and development projects.",
      votingResults: {
        yes: { votes: 567, percentage: 78, power: "4,200,000 tokens" },
        no: { votes: 159, percentage: 22, power: "1,180,000 tokens" },
        totalVotes: 726,
        totalPower: "5,380,000 tokens",
        quorum: "25%",
        threshold: "Simple majority",
      },
      timeline: {
        created: "2024-03-05T13:45:00Z",
        votingStarted: "2024-03-07T13:45:00Z",
        votingEnded: "2024-03-08T13:45:00Z",
        executed: "2024-03-08T13:45:00Z",
      },
    },
  },
  {
    id: 6,
    type: "Vote",
    timestamp: "2024-03-07T10:30:00Z",
    proposalTitle: "Upgrade Protocol Security Framework",
    author: "0xF2B5...8E4C",
    txHash: "0x6e9a2d5f8b1c4e7a3d6f9b2c5e8a1d4f7b3c6e9a2d5f8b1c4e7a3d6f9b2c5e8a",
    status: "Confirmed",
    blockNumber: 2840123,
    gasUsed: "0.0007 ICP",
    canisterId: "rrkah-fqaaa-aaaah-qcpba-cai",
    details: {
      voteChoice: "Yes",
      votingPower: "22,000 tokens",
      proposalDescription:
        "Proposal to implement enhanced security measures including multi-signature requirements and time-locked transactions for critical protocol changes.",
      voterReason:
        "Security should be our top priority. These measures will protect our community and increase trust in the protocol.",
    },
  },
]

export default function GovernanceExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((tx) => {
      const matchesSearch =
        tx.proposalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.author.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter = filterType === "All" || tx.type === filterType

      return matchesSearch && matchesFilter
    })
  }, [searchTerm, filterType])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Executed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const totalTransactions = mockTransactions.length
  const totalProposals = mockTransactions.filter((tx) => tx.type === "Proposal").length
  const totalVotes = mockTransactions.filter((tx) => tx.type === "Vote").length
  const userVotingPower = "45,500 tokens"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">OV</span>
              </div>
              <span className="text-xl font-bold">OpenVote</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Governance Explorer</h1>
          <p className="text-muted-foreground">
            Track your governance activity and transaction history on the Internet Computer network
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTransactions}</div>
              <p className="text-xs text-muted-foreground">All governance activities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proposals Created</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProposals}</div>
              <p className="text-xs text-muted-foreground">Community proposals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Votes Cast</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVotes}</div>
              <p className="text-xs text-muted-foreground">Participation in voting</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Voting Power</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userVotingPower}</div>
              <p className="text-xs text-muted-foreground">Current governance tokens</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View and search through your governance activity on the ICP network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by proposal title, hash, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Proposal">Proposals</SelectItem>
                  <SelectItem value="Vote">Votes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transaction Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Proposal Title</TableHead>
                    <TableHead>Author/Voter</TableHead>
                    <TableHead>Tx Hash</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {tx.type === "Proposal" ? (
                              <FileText className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Vote className="w-4 h-4 text-green-600" />
                            )}
                            <span className="font-medium">{tx.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{formatDate(tx.timestamp)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate font-medium">{tx.proposalTitle}</div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded">{tx.author}</code>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="link"
                                className="p-0 h-auto font-mono text-xs"
                                onClick={() => setSelectedTransaction(tx)}
                              >
                                {formatHash(tx.txHash)}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center space-x-2">
                                  {selectedTransaction?.type === "Proposal" ? (
                                    <FileText className="w-5 h-5 text-blue-600" />
                                  ) : (
                                    <Vote className="w-5 h-5 text-green-600" />
                                  )}
                                  <span>Transaction Details</span>
                                </DialogTitle>
                                <DialogDescription>
                                  {selectedTransaction?.type} •{" "}
                                  {selectedTransaction && formatDate(selectedTransaction.timestamp)}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedTransaction && (
                                <div className="space-y-6">
                                  {/* Basic Transaction Info */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Transaction Hash</h4>
                                      <div className="flex items-center space-x-2">
                                        <code className="text-xs bg-muted p-2 rounded flex-1 break-all">
                                          {selectedTransaction.txHash}
                                        </code>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => copyToClipboard(selectedTransaction.txHash)}
                                        >
                                          <Copy className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Block Number</h4>
                                      <p className="text-sm text-muted-foreground">
                                        #{selectedTransaction.blockNumber.toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Gas Used</h4>
                                      <p className="text-sm text-muted-foreground">{selectedTransaction.gasUsed}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Canister ID</h4>
                                      <div className="flex items-center space-x-2">
                                        <code className="text-xs bg-muted p-1 rounded">
                                          {selectedTransaction.canisterId}
                                        </code>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => copyToClipboard(selectedTransaction.canisterId)}
                                        >
                                          <Copy className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Proposal Details */}
                                  {selectedTransaction.type === "Proposal" && (
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-medium mb-2">Proposal Title</h4>
                                        <p className="text-sm">{selectedTransaction.proposalTitle}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">Description</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {selectedTransaction.details.description}
                                        </p>
                                      </div>

                                      {/* Voting Results */}
                                      {selectedTransaction.details.votingResults && (
                                        <div>
                                          <h4 className="font-medium mb-3">Voting Results</h4>
                                          <div className="space-y-3">
                                            <div className="space-y-2">
                                              <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center space-x-2">
                                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                                  <span>Yes</span>
                                                </span>
                                                <span className="font-medium">
                                                  {selectedTransaction.details.votingResults.yes.percentage}% (
                                                  {selectedTransaction.details.votingResults.yes.votes} votes)
                                                </span>
                                              </div>
                                              <Progress
                                                value={selectedTransaction.details.votingResults.yes.percentage}
                                                className="h-2"
                                              />
                                              <p className="text-xs text-muted-foreground">
                                                Voting Power: {selectedTransaction.details.votingResults.yes.power}
                                              </p>
                                            </div>
                                            <div className="space-y-2">
                                              <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center space-x-2">
                                                  <X className="w-4 h-4 text-red-600" />
                                                  <span>No</span>
                                                </span>
                                                <span className="font-medium">
                                                  {selectedTransaction.details.votingResults.no.percentage}% (
                                                  {selectedTransaction.details.votingResults.no.votes} votes)
                                                </span>
                                              </div>
                                              <Progress
                                                value={selectedTransaction.details.votingResults.no.percentage}
                                                className="h-2"
                                              />
                                              <p className="text-xs text-muted-foreground">
                                                Voting Power: {selectedTransaction.details.votingResults.no.power}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="mt-4 p-3 bg-muted rounded-lg">
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                              <div>
                                                <span className="text-muted-foreground">Total Votes:</span>
                                                <span className="ml-2 font-medium">
                                                  {selectedTransaction.details.votingResults.totalVotes}
                                                </span>
                                              </div>
                                              <div>
                                                <span className="text-muted-foreground">Total Power:</span>
                                                <span className="ml-2 font-medium">
                                                  {selectedTransaction.details.votingResults.totalPower}
                                                </span>
                                              </div>
                                              <div>
                                                <span className="text-muted-foreground">Quorum:</span>
                                                <span className="ml-2 font-medium">
                                                  {selectedTransaction.details.votingResults.quorum}
                                                </span>
                                              </div>
                                              <div>
                                                <span className="text-muted-foreground">Threshold:</span>
                                                <span className="ml-2 font-medium">
                                                  {selectedTransaction.details.votingResults.threshold}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* Current Votes (for pending proposals) */}
                                      {selectedTransaction.details.currentVotes && (
                                        <div>
                                          <h4 className="font-medium mb-3">Current Voting Status</h4>
                                          <div className="space-y-3">
                                            <div className="space-y-2">
                                              <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center space-x-2">
                                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                                  <span>Yes</span>
                                                </span>
                                                <span className="font-medium">
                                                  {selectedTransaction.details.currentVotes.yes.percentage}% (
                                                  {selectedTransaction.details.currentVotes.yes.votes} votes)
                                                </span>
                                              </div>
                                              <Progress
                                                value={selectedTransaction.details.currentVotes.yes.percentage}
                                                className="h-2"
                                              />
                                            </div>
                                            <div className="space-y-2">
                                              <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center space-x-2">
                                                  <X className="w-4 h-4 text-red-600" />
                                                  <span>No</span>
                                                </span>
                                                <span className="font-medium">
                                                  {selectedTransaction.details.currentVotes.no.percentage}% (
                                                  {selectedTransaction.details.currentVotes.no.votes} votes)
                                                </span>
                                              </div>
                                              <Progress
                                                value={selectedTransaction.details.currentVotes.no.percentage}
                                                className="h-2"
                                              />
                                            </div>
                                          </div>
                                          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                            <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200 mb-2">
                                              <Clock className="w-4 h-4" />
                                              <span className="font-medium">Voting in Progress</span>
                                            </div>
                                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                              Voting ends: {formatDate(selectedTransaction.details.timeline.votingEnds)}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Vote Details */}
                                  {selectedTransaction.type === "Vote" && (
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-medium mb-2">Vote Choice</h4>
                                        <div className="flex items-center space-x-2">
                                          {selectedTransaction.details.voteChoice === "Yes" ? (
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                          ) : (
                                            <X className="w-4 h-4 text-red-600" />
                                          )}
                                          <span className="font-medium">{selectedTransaction.details.voteChoice}</span>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">Voting Power Used</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {selectedTransaction.details.votingPower}
                                        </p>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">Proposal Voted On</h4>
                                        <p className="text-sm">{selectedTransaction.proposalTitle}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2">Proposal Description</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {selectedTransaction.details.proposalDescription}
                                        </p>
                                      </div>
                                      {selectedTransaction.details.voterReason && (
                                        <div>
                                          <h4 className="font-medium mb-2">Voting Reason</h4>
                                          <p className="text-sm text-muted-foreground italic">
                                            "{selectedTransaction.details.voterReason}"
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* External Links */}
                                  <div className="flex items-center space-x-2 pt-4 border-t">
                                    <Button variant="outline" size="sm">
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      View on ICP Explorer
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Copy className="w-4 h-4 mr-2" />
                                      Copy Transaction Link
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="text-muted-foreground">
                          <Search className="w-8 h-8 mx-auto mb-2" />
                          <p>No transactions found matching your criteria</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
