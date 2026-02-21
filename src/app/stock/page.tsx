import { StockPageClient } from "./page.client";

export default async function StockPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const modal = typeof params?.modal === "string" ? params.modal : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Inventario</h2>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-2 text-left font-medium">Producto</th>
              <th className="px-4 py-2 text-left font-medium">SKU</th>
              <th className="px-4 py-2 text-right font-medium">Cantidad</th>
              <th className="px-4 py-2 text-right font-medium">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Laptop HP Pavilion</td>
              <td className="px-4 py-2 text-muted-foreground">SKU-001</td>
              <td className="px-4 py-2 text-right">15</td>
              <td className="px-4 py-2 text-right">$899.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Mouse Logitech MX</td>
              <td className="px-4 py-2 text-muted-foreground">SKU-002</td>
              <td className="px-4 py-2 text-right">42</td>
              <td className="px-4 py-2 text-right">$79.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Monitor Dell 27"</td>
              <td className="px-4 py-2 text-muted-foreground">SKU-003</td>
              <td className="px-4 py-2 text-right">8</td>
              <td className="px-4 py-2 text-right">$349.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <StockPageClient initialModal={modal} />
    </div>
  );
}
