import { DashboardTable } from "@/components/dashboard-table";
import { getSales } from "@/lib/data/queries";

export async function SalesTable() {
  const sales = await getSales();

  return (
    <DashboardTable
      data={sales}
      getRowKey={(sale) => sale.id}
      columns={[
        { header: "Venta #", accessorFn: (s) => s.id },
        { header: "Cliente", accessorFn: (s) => s.client },
        {
          header: "Fecha",
          accessorFn: (s) => s.date,
          className: "text-muted-foreground",
        },
        {
          header: "Total",
          accessorFn: (s) => `$${s.total.toFixed(2)}`,
          className: "text-right",
        },
      ]}
    />
  );
}
