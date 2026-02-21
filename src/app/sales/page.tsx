import { SalesPageClient } from "./page.client";

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const modal = typeof params?.modal === "string" ? params.modal : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Ventas</h2>
      </div>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-2 text-left font-medium">Venta #</th>
              <th className="px-4 py-2 text-left font-medium">Cliente</th>
              <th className="px-4 py-2 text-left font-medium">Fecha</th>
              <th className="px-4 py-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">V-001</td>
              <td className="px-4 py-2">Maria García</td>
              <td className="px-4 py-2 text-muted-foreground">2026-02-20</td>
              <td className="px-4 py-2 text-right">$1,247.00</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">V-002</td>
              <td className="px-4 py-2">Carlos López</td>
              <td className="px-4 py-2 text-muted-foreground">2026-02-19</td>
              <td className="px-4 py-2 text-right">$89.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2">V-003</td>
              <td className="px-4 py-2">Ana Rodríguez</td>
              <td className="px-4 py-2 text-muted-foreground">2026-02-18</td>
              <td className="px-4 py-2 text-right">$432.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SalesPageClient initialModal={modal} />
    </div>
  );
}
