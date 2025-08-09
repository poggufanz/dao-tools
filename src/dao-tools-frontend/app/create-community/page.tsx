"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useInternetIdentity } from "@/contexts/InternetIdentityProvider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Eye,
  Globe,
  Lock,
  Users,
  Shield,
  Settings,
  CheckCircle,
  ImageIcon,
  Hash,
  Loader2,
} from "lucide-react";

export default function CreateCommunityPage() {
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    category: "",
    logo: null as File | null,
    banner: null as File | null,
    isPrivate: false,
    requireApproval: false,
    enableNFTGating: false,
    nftContract: "",
    votingMethod: "one-person-one-vote",
    minimumTokens: "",
    channels: ["general", "announcements"],
    newChannel: "",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { actor } = useInternetIdentity();
  const { toast } = useToast();
  const router = useRouter();

  const categories = [
    "DeFi",
    "Education",
    "Environment",
    "Tech",
    "Art",
    "Gaming",
    "Social",
    "Investment",
    "Research",
    "Other",
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleAddChannel = () => {
    const channel = formData.newChannel.trim();
    if (channel && !formData.channels.includes(channel)) {
      setFormData((prev) => ({
        ...prev,
        channels: [...prev.channels, channel],
        newChannel: "",
      }));
    }
  };

  const handleRemoveChannel = (channel: string) => {
    if (channel !== "general") {
      setFormData((prev) => ({
        ...prev,
        channels: prev.channels.filter((c) => c !== channel),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast({
        title: "Error",
        description: "You must be logged in to create a community.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Construct the payload with all necessary data
      const communityPayload = {
        name: formData.name,
        tagline: formData.tagline,
        description: formData.description,
        category: formData.category,
        logo: [], // Placeholder for logo upload logic
        banner: [], // Placeholder for banner upload logic
        isPrivate: formData.isPrivate,
        requireApproval: formData.requireApproval,
        // DFINITY doesn't directly support NFT gating from the frontend like this
        // This would typically be a backend canister-to-canister interaction.
        // We'll pass a simplified version for now.
        nftGating: {
          enabled: formData.enableNFTGating,
          contract: formData.nftContract,
        },
        voting: {
          method: formData.votingMethod,
          minTokens: BigInt(formData.minimumTokens || 0),
        },
        channels: formData.channels,
      };

      // @ts-ignore
      const result = await actor.createCommunity(communityPayload);

      // Handle potential errors returned from the canister
      if ('err' in result) {
        throw new Error(Object.keys(result.err).join(', '));
      }

      const newCommunityId = result.ok.id.toString();

      toast({
        title: "Success!",
        description: `Community "${formData.name}" has been created.`,
        action: (
          <Button asChild>
            <Link href={`/community/${newCommunityId}`}>View Community</Link>
          </Button>
        ),
      });
      router.push(`/community/${newCommunityId}`);
    } catch (error) {
      console.error("Failed to create community:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Error Creating Community",
        description: `Failed to create community: ${errorMessage}. Please check the console for more details and try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      DeFi: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      Education: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      Environment: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
      Tech: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
      Art: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
      Gaming: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    };
    return colors[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  const getVotingMethodDescription = (method: string) => {
    switch (method) {
      case "one-person-one-vote":
        return "Each verified member gets exactly one vote";
      case "token-based":
        return "Voting power based on token holdings";
      case "quadratic":
        return "Cost of additional votes increases quadratically";
      case "nft-based":
        return "Voting power based on NFT ownership";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/communities">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Communities
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Create New Community</h1>
              <p className="text-muted-foreground">Build a space for your community to collaborate and vote</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                >
                  {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${step > stepNumber ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Set up the fundamental details of your community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Community Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your community name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline *</Label>
                      <Input
                        id="tagline"
                        placeholder="A brief description of your community's purpose"
                        value={formData.tagline}
                        onChange={(e) => handleInputChange("tagline", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide a detailed description of your community, its goals, and what members can expect..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="logo">Community Logo</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="logo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload("logo", e)}
                            className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-muted file:text-muted-foreground"
                          />
                          <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">Recommended: 200x200px, PNG or JPG</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="banner">Banner Image</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="banner"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload("banner", e)}
                            className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-muted file:text-muted-foreground"
                          />
                          <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">Recommended: 1200x300px, PNG or JPG</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Access & Governance */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Access & Governance</CardTitle>
                    <CardDescription>Configure how members join and participate in governance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Privacy Settings */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Privacy Settings
                      </h4>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            {formData.isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                            <label className="text-sm font-medium">
                              {formData.isPrivate ? "Private Community" : "Public Community"}
                            </label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formData.isPrivate
                              ? "Only invited members can see and join this community"
                              : "Anyone can discover and join this community"}
                          </p>
                        </div>
                        <Switch
                          checked={formData.isPrivate}
                          onCheckedChange={(checked) => handleInputChange("isPrivate", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <label className="text-sm font-medium">Require Approval</label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            New members must be approved by admins before joining
                          </p>
                        </div>
                        <Switch
                          checked={formData.requireApproval}
                          onCheckedChange={(checked) => handleInputChange("requireApproval", checked)}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* NFT Gating */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        NFT Gating (Optional)
                      </h4>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Enable NFT Gating</label>
                          <p className="text-sm text-muted-foreground">
                            Require specific NFT ownership to join this community
                          </p>
                        </div>
                        <Switch
                          checked={formData.enableNFTGating}
                          onCheckedChange={(checked) => handleInputChange("enableNFTGating", checked)}
                        />
                      </div>

                      {formData.enableNFTGating && (
                        <div className="space-y-2">
                          <Label htmlFor="nftContract">NFT Contract Address</Label>
                          <Input
                            id="nftContract"
                            placeholder="0x..."
                            value={formData.nftContract}
                            onChange={(e) => handleInputChange("nftContract", e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter the contract address of the NFT collection required for membership
                          </p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Voting Method */}
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Voting Method
                      </h4>

                      <div className="space-y-2">
                        <Label htmlFor="votingMethod">Default Voting Method</Label>
                        <Select
                          value={formData.votingMethod}
                          onValueChange={(value) => handleInputChange("votingMethod", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select voting method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="one-person-one-vote">One Person One Vote</SelectItem>
                            <SelectItem value="token-based">Token-Based Voting</SelectItem>
                            <SelectItem value="quadratic">Quadratic Voting</SelectItem>
                            <SelectItem value="nft-based">NFT-Based Voting</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          {getVotingMethodDescription(formData.votingMethod)}
                        </p>
                      </div>

                      {(formData.votingMethod === "token-based" || formData.votingMethod === "nft-based") && (
                        <div className="space-y-2">
                          <Label htmlFor="minimumTokens">
                            Minimum {formData.votingMethod === "token-based" ? "Tokens" : "NFTs"} Required
                          </Label>
                          <Input
                            id="minimumTokens"
                            type="number"
                            placeholder="1"
                            value={formData.minimumTokens}
                            onChange={(e) => handleInputChange("minimumTokens", e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Channels & Launch */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Channels & Launch</CardTitle>
                    <CardDescription>Set up communication channels and launch your community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Communication Channels
                      </h4>

                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {formData.channels.map((channel) => (
                            <Badge key={channel} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                              <Hash className="w-3 h-3" />
                              {channel}
                              {channel !== "general" && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveChannel(channel)}
                                  className="ml-1 hover:text-destructive"
                                >
                                  ×
                                </button>
                              )}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Input
                            placeholder="Add new channel"
                            value={formData.newChannel}
                            onChange={(e) => handleInputChange("newChannel", e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddChannel())}
                          />
                          <Button type="button" variant="outline" onClick={handleAddChannel}>
                            Add
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Channels help organize discussions by topic. The "general" channel is required.
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Review & Launch</h4>
                      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Community information configured</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Access and governance settings defined</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Communication channels set up</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Once you create your community, you'll be able to invite members, create proposals, and start
                        building your governance structure.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                >
                  Previous
                </Button>

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(Math.min(3, step + 1))}
                    disabled={
                      (step === 1 &&
                        (!formData.name || !formData.tagline || !formData.description || !formData.category)) ||
                      (step === 2 && formData.enableNFTGating && !formData.nftContract)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Community"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            {showPreview && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preview</CardTitle>
                  <CardDescription>How your community will appear to others</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Community Card Preview */}
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {formData.name ? formData.name.slice(0, 2).toUpperCase() : "CN"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium truncate">{formData.name || "Community Name"}</h3>
                            {formData.isPrivate && <Lock className="w-4 h-4 text-muted-foreground" />}
                          </div>
                          {formData.category && (
                            <Badge variant="secondary" className={`text-xs ${getCategoryColor(formData.category)}`}>
                              {formData.category}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {formData.tagline || "Community tagline will appear here"}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>0 members</span>
                        <span>Just created</span>
                      </div>

                      <Button size="sm" className="w-full">
                        Join Community
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Choose a clear, descriptive name that reflects your community's purpose</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Write a comprehensive description to help members understand your goals</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Select appropriate privacy and governance settings for your use case</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Set up relevant channels to organize discussions effectively</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Start Small</p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Begin with a few core channels and add more as your community grows
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="font-medium text-green-900 dark:text-green-100 mb-1">Engage Early</p>
                    <p className="text-green-700 dark:text-green-300">
                      Create your first proposal or post to get conversations started
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <p className="font-medium text-purple-900 dark:text-purple-100 mb-1">Set Clear Rules</p>
                    <p className="text-purple-700 dark:text-purple-300">
                      Establish community guidelines and governance processes early
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}