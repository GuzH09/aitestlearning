import { DashboardTable } from "@/components/dashboard-table";
import { getProducts } from "@/lib/data/queries";

export async function StockTable() {
  const products = await getProducts();

  return (
    <DashboardTable
      data={products}
      getRowKey={(p) => p.sku}
      columns={[
        { header: "Producto", accessorFn: (p) => p.name },
        {
          header: "SKU",
          accessorFn: (p) => p.sku,
          className: "text-muted-foreground",
        },
        {
          header: "Cantidad",
          accessorFn: (p) => p.quantity,
          className: "text-right",
        },
        {
          header: "Precio",
          accessorFn: (p) => `$${p.price.toFixed(2)}`,
          className: "text-right",
        },
      ]}
    />
  );
}
