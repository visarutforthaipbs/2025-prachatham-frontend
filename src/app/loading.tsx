import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function RootLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <LoadingSkeleton type="page" />
    </div>
  );
}
