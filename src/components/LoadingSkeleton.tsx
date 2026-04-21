"use client";

interface LoadingSkeletonProps {
  count?: number;
  type?: "post" | "project" | "page";
}

export default function LoadingSkeleton({
  count = 6,
  type = "post",
}: LoadingSkeletonProps) {
  if (type === "page") {
    return <PageSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) =>
        type === "project" ? (
          <ProjectCardSkeleton key={`skeleton-${index}`} />
        ) : (
          <PostCardSkeleton key={`skeleton-${index}`} />
        )
      )}
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <div className="max-w-sm overflow-hidden rounded-lg shadow-sm bg-white dark:bg-gray-800 h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="skeleton h-[200px]" />

      <div className="flex-1 flex flex-col p-6">
        {/* Category Skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <div className="skeleton h-5 w-[60px] rounded-full" />
          <div className="skeleton h-5 w-[80px] rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="flex flex-col items-start gap-1 mb-3">
          <div className="skeleton h-5 w-full" />
          <div className="skeleton h-5 w-4/5" />
          <div className="skeleton h-5 w-3/5" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="flex flex-col items-start gap-1 mb-4 flex-1">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
        </div>

        {/* Date and Link Skeleton */}
        <div className="flex justify-between items-center">
          <div className="skeleton h-4 w-[100px]" />
          <div className="skeleton h-4 w-[60px]" />
        </div>
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg shadow-sm bg-white dark:bg-gray-800 h-full flex flex-col">
      <div className="skeleton h-[200px]" />
      <div className="p-6">
        <div className="skeleton h-6 w-4/5 mb-3" />
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2 w-full">
            <div className="skeleton h-3.5 w-[60px]" />
            <div className="skeleton h-3.5 w-[100px]" />
          </div>
          <div className="flex items-center gap-2 w-full">
            <div className="skeleton h-3.5 w-[50px]" />
            <div className="skeleton h-3.5 w-[120px]" />
          </div>
        </div>
        <div className="skeleton h-9 w-full mt-4 rounded-md" />
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-6">
        <div className="skeleton h-10 w-3/5" />
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-[100px]" />
          <div className="skeleton h-4 w-[80px]" />
        </div>
        <div className="skeleton h-[400px] rounded-lg" />
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

export { PostCardSkeleton, ProjectCardSkeleton, PageSkeleton };
