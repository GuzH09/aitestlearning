import { DashboardTableSkeleton } from "@/components/dashboard-table";
import { Skeleton } from "@/components/ui/skeleton";
import { SalesPageClient } from "./page.client";
import { Suspense } from "react";
import { SalesTable } from "./sales-table";

export default async function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Ventas</h2>
      </div>

      <div className="rounded-md border">
        <Suspense fallback={<DashboardTableSkeleton columns={4} />}>
          <SalesTable />
        </Suspense>
      </div>

      <Suspense fallback={<Skeleton className="h-9 w-32 rounded-md" />}>
        <SalesPageClient />
      </Suspense>
    </div>
  );
}
