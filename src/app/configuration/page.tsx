import { Suspense } from "react";
import { ConfigurationInfo } from "./configuration-info";

export default async function ConfigurationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Configuración</h2>
      </div>

      <Suspense fallback={<div>Cargando...</div>}>
        <ConfigurationInfo />
      </Suspense>
    </div>
  );
}
