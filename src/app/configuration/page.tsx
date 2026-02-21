import { ConfigurationPageClient } from "./page.client";

export default async function ConfigurationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const modal = typeof params?.modal === "string" ? params.modal : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Configuración</h2>
      </div>

      <div className="space-y-4">
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Nombre de la tienda</p>
              <p className="text-sm text-muted-foreground">Mi Tienda Online</p>
            </div>
          </div>
        </div>
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Moneda</p>
              <p className="text-sm text-muted-foreground">USD ($)</p>
            </div>
          </div>
        </div>
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Zona horaria</p>
              <p className="text-sm text-muted-foreground">
                America/Mexico_City (UTC-6)
              </p>
            </div>
          </div>
        </div>
      </div>

      <ConfigurationPageClient initialModal={modal} />
    </div>
  );
}
