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
        <Suspense fallback={<div>Cargando...</div>}>
          <SalesTable />
        </Suspense>
      </div>

      <Suspense fallback={<div>Cargando...</div>}>
        <SalesPageClient />
      </Suspense>
    </div>
  );
}
