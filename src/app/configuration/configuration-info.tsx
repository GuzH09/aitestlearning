import { Skeleton } from "@/components/ui/skeleton";
import { getConfig } from "@/lib/data/queries";
import { ConfigurationPageClient } from "./page.client";

export function ConfigurationInfoSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`skeleton-card-${String(i)}`}
          className="rounded-md border p-4"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function ConfigurationInfo() {
  const config = await getConfig();

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Nombre de la tienda</p>
              <p className="text-sm text-muted-foreground">
                {config.storeName}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Moneda</p>
              <p className="text-sm text-muted-foreground">{config.currency}</p>
            </div>
          </div>
        </div>
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Zona horaria</p>
              <p className="text-sm text-muted-foreground">{config.timezone}</p>
            </div>
          </div>
        </div>
      </div>

      <ConfigurationPageClient config={config} />
    </>
  );
}
