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

export function SalesPageClient({
  initialModal,
}: {
  initialModal: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(initialModal === "create-sale");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.replace("/sales");
    }
  };

  const handleOpenCreateSale = () => {
    setOpen(true);
    router.replace("/sales?modal=create-sale");
  };

  return (
    <>
      <Button onClick={handleOpenCreateSale}>+ Nueva Venta</Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Venta</DialogTitle>
            <DialogDescription>
              Registra una nueva venta ingresando los datos del cliente y los
              productos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sale-client">Cliente</Label>
              <Input id="sale-client" placeholder="Nombre del cliente" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sale-product">Producto</Label>
              <Input id="sale-product" placeholder="Nombre del producto" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sale-qty">Cantidad</Label>
                <Input id="sale-qty" type="number" placeholder="1" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sale-total">Total</Label>
                <Input id="sale-total" type="number" placeholder="0.00" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={() => handleOpenChange(false)}>
              Registrar Venta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
