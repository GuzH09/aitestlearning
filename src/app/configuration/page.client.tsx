"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ConfigurationPageClient({
  initialModal,
}: {
  initialModal: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(initialModal === "change-setting");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.replace("/configuration");
    }
  };

  const handleOpenChangeSetting = () => {
    setOpen(true);
    router.replace("/configuration?modal=change-setting");
  };

  return (
    <>
      <Button onClick={handleOpenChangeSetting}>Editar Configuración</Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Configuración</DialogTitle>
            <DialogDescription>
              Modifica los ajustes generales de la aplicación.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="setting-store-name">Nombre de la tienda</Label>
              <Input
                id="setting-store-name"
                defaultValue="Mi Tienda Online"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="setting-currency">Moneda</Label>
              <Input id="setting-currency" defaultValue="USD" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="setting-timezone">Zona horaria</Label>
              <Input
                id="setting-timezone"
                defaultValue="America/Mexico_City"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={() => handleOpenChange(false)}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
