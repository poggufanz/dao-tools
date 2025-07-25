import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function GovernanceExplorerLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-8 h-8" />
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-24 h-6" />
            </div>
          </div>
          <Skeleton className="w-8 h-8" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-64 h-8 mb-2" />
          <Skeleton className="w-96 h-4" />
        </div>

        {/* Stats Overview Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-4 h-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-12 h-8 mb-1" />
                <Skeleton className="w-32 h-3" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transaction Table Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="w-48 h-6 mb-2" />
            <Skeleton className="w-80 h-4" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="w-full sm:w-48 h-10" />
            </div>

            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-48 h-4" />
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-16 h-6" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
