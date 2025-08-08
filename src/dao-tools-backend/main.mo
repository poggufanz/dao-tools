import RBTree     "mo:base/RBTree";
import Iter       "mo:base/Iter";
import Principal  "mo:base/Principal";
import Time       "mo:base/Time";
import Nat        "mo:base/Nat";
import Result     "mo:base/Result";
import Array      "mo:base/Array";
import Buffer     "mo:base/Buffer";

persistent actor DaoToolsBackend {
  // ─── Type Definitions ───────────────────────────────────────────

  type CommunityId    = Nat;
  type ProposalId     = Nat;

  type Community = {
    id          : CommunityId;
    name        : Text;
    description : Text;
    owner       : Principal;
    members     : [Principal];
  };

  type VoteOption     = { #Yes; #No };
  type ProposalStatus = { #Open; #Closed; #Passed; #Failed };

  type Proposal = {
    id          : ProposalId;
    communityId : CommunityId;
    title       : Text;
    description : Text;
    proposer    : Principal;
    votes       : [(Principal, VoteOption)];
    status      : ProposalStatus;
    createdAt   : Time.Time;
    endsAt      : Time.Time;
  };

  type VoteTree  = RBTree.RBTree<Principal, VoteOption>;
  type Proposal_ = {
    id          : ProposalId;
    communityId : CommunityId;
    title       : Text;
    description : Text;
    proposer    : Principal;
    votes       : VoteTree;
    status      : ProposalStatus;
    createdAt   : Time.Time;
    endsAt      : Time.Time;
  };

  // ─── State ──────────────────────────────────────────────────────

  transient var communities      : RBTree.RBTree<CommunityId, Community> = RBTree.RBTree(Nat.compare);
  transient var proposals        : RBTree.RBTree<ProposalId, Proposal_>   = RBTree.RBTree(Nat.compare);
  transient var nextCommunityId  : Nat = 0;
  transient var nextProposalId   : Nat = 0;

  // ─── Helpers ────────────────────────────────────────────────────

  private func proposalToPublic(p: Proposal_) : Proposal {
    let entries    = p.votes.entries();
    let votesArray = Iter.toArray(entries);
    {
      id          = p.id;
      communityId = p.communityId;
      title       = p.title;
      description = p.description;
      proposer    = p.proposer;
      votes       = votesArray;
      status      = p.status;
      createdAt   = p.createdAt;
      endsAt      = p.endsAt;
    }
  };

  private func isMember(x: Principal, xs: [Principal]) : Bool {
    Array.find<Principal>(xs, func(y) { y == x }) != null
  };

  // ─── Methods ────────────────────────────────────────────────────

  public shared (msg) func createCommunity(name: Text, description: Text) : async Result.Result<Community, Text> {
    if (name == "") {
      return #err("Community name cannot be empty.");
    };
    let caller = msg.caller;
    let cid    = nextCommunityId;
    let newComm : Community = {
      id          = cid;
      name        = name;
      description = description;
      owner       = caller;
      members     = [caller];
    };
    communities.put(cid, newComm);
    nextCommunityId += 1;
    #ok(newComm)
  };

  public query func getCommunity(id: CommunityId) : async ?Community {
    communities.get(id)
  };

  public shared (msg) func createProposal(
    communityId   : CommunityId,
    title         : Text,
    description   : Text,
    durationNanos : Nat
  ) : async Result.Result<Proposal, Text> {
    let caller = msg.caller;
    switch (communities.get(communityId)) {
      case null {
        return #err("Community does not exist.");
      };
      case (?ccomm) {
        if (not isMember(caller, ccomm.members)) {
          return #err("You are not a member of this community.");
        };
        let pid   = nextProposalId;
        let now   = Time.now();
        let vtree : VoteTree = RBTree.RBTree<Principal, VoteOption>(Principal.compare);
        let newP : Proposal_ = {
          id          = pid;
          communityId = communityId;
          title       = title;
          description = description;
          proposer    = caller;
          votes       = vtree;
          status      = #Open;
          createdAt   = now;
          endsAt      = now + durationNanos;
        };
        proposals.put(pid, newP);
        nextProposalId += 1;
        return #ok(proposalToPublic(newP));
      };
    }
  };

  public query func getProposal(id: ProposalId) : async ?Proposal {
    switch (proposals.get(id)) {
      case null {
        return null;
      };
      case (?proposal_) {
        return ?proposalToPublic(proposal_);
      };
    }
  };

  public query func getCommunityProposals(communityId: CommunityId) : async [Proposal] {
    let buf : Buffer.Buffer<Proposal> = Buffer.Buffer<Proposal>(0);
    for ((_, p) in proposals.entries()) {
      if (p.communityId == communityId) {
        buf.add(proposalToPublic(p));
      };
    };
    return Buffer.toArray<Proposal>(buf);
  };

  public shared (msg) func vote(
    proposalId : ProposalId,
    voteOpt    : VoteOption
  ) : async Result.Result<Text, Text> {
    let caller = msg.caller;
    switch (proposals.get(proposalId)) {
      case null {
        return #err("Proposal does not exist.");
      };
      case (?p) {
        if (p.status != #Open) {
          return #err("This proposal is not open for voting.");
        };
        if (Time.now() > p.endsAt) {
          return #err("The voting period for this proposal has ended.");
        };
        switch (communities.get(p.communityId)) {
          case null {
            return #err("Internal error: Community not found.");
          };
          case (?c) {
            if (Array.find<Principal>(c.members, func(x) { x == caller }) == null) {
              return #err("You are not a member and cannot vote.");
            };
          };
        };
        if (p.votes.get(caller) != null) {
          return #err("You have already voted.");
        };
        p.votes.put(caller, voteOpt);
        proposals.put(proposalId, p);
        return #ok("Vote cast successfully.");
      };
    }
  };
}
