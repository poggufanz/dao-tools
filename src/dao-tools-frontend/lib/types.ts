export type Transaction = {
  type: "Proposal" | "Vote"
  timestamp: string
  title: string
  author: string
  hash: string
  status: "Executed" | "Confirmed" | "Pending"
  details: ProposalDetails | VoteDetails
}

export type ProposalDetails = {
  description: string
  votes: {
    for: number
    against: number
    abstain: number
  }
  turnout: number
}

export type VoteDetails = {
  vote: "For" | "Against" | "Abstain"
  votingPower: number
  proposalHash: string
}
