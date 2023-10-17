import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";

export default function loadingUsers() {
  return (
    <div>
      <Header title="Users" description={"Role Based Access Control"} />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-full opacity-75" />
        <Skeleton className="h-4 w-full opacity-75" />
        <Skeleton className="h-4 w-full opacity-75" />
        <Skeleton className="h-4 w-full opacity-75" />
      </div>
    </div>
  );
}
