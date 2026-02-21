import { StockPageClient } from "./page.client";
import { Suspense } from "react";
import { StockTable } from "./stock-table";

export default async function StockPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Inventario</h2>
      </div>

      <div className="rounded-md border">
        <Suspense fallback={<div>Cargando...</div>}>
          <StockTable />
        </Suspense>
      </div>

      <Suspense>
        <StockPageClient />
      </Suspense>
    </div>
  );
}
