// frontend/src/lib/dfx.ts
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory } from "../../declarations/dao-tools-backend";

// 1. Pull in the env var and assert it’s present.
//    You can either keep it as a raw string or convert to a Principal.
const rawCanisterId = process.env
  .NEXT_PUBLIC_DAO_TOOLS_BACKEND_CANISTER_ID!;
  
// Option A: keep as string
// const canisterId: string = rawCanisterId;

// Option B: convert to Principal (often safer for dfx local)
const canisterId: Principal =
  Principal.fromText(rawCanisterId);

export function createActor(identity: Identity) {
  const agent = new HttpAgent({
    host: process.env.NEXT_PUBLIC_IC_HOST!,
    identity,
  });

  // In dev only: fetch the root key so local replica certs work
  if (process.env.NODE_ENV !== "production") {
    void agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch IC root key – if you're on local dfx, make sure it's running."
      );
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,    // now strongly typed as Principal
  });
}
