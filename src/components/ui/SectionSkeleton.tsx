import { Skeleton } from "@/components/ui/skeleton";

interface SectionSkeletonProps {
  className?: string;
}

export function SectionSkeleton({ className = "" }: SectionSkeletonProps) {
  return (
    <div className={`py-20 px-4 sm:px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Title skeleton */}
        <div className="text-center mb-10 md:mb-16">
          <Skeleton className="h-10 w-64 mx-auto mb-3" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        
        {/* Content skeleton grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
              <Skeleton className="w-12 h-12 rounded-lg mb-4" />
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SectionSkeleton;
