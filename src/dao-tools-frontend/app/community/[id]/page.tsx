"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInternetIdentity } from "@/contexts/InternetIdentityProvider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CommunityPage() {
  const { actor } = useInternetIdentity();
  const params = useParams();
  const [community, setCommunity] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor) return;
    const id = BigInt(params.id as string);
    actor.getCommunity(id).then((res: any) => {
      setCommunity(res ?? null);
      setLoading(false);
    });
  }, [actor, params.id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!community) {
    return <div className="p-4">Community not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{community.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">{community.description}</p>
          <p className="text-sm text-muted-foreground">
            Members: {community.members.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
