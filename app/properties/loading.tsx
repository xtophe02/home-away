"use client";

import { Skeleton } from "@/components/ui/skeleton";
export default function loading() {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="h-[50px] md:h-[100px] w-full rounded" />
      <Skeleton className="h-[300px] md:h-[500px] w-full rounded" />
    </div>
  );
}
