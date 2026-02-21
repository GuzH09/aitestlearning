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

export function StockPageClient({
  initialModal,
}: {
  initialModal: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(initialModal === "add-item");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      router.replace("/stock");
    }
  };

  const handleOpenAddItem = () => {
    setOpen(true);
    router.replace("/stock?modal=add-item");
  };

  return (
    <>
      <Button onClick={handleOpenAddItem}>+ Agregar Producto</Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Producto</DialogTitle>
            <DialogDescription>
              Ingresa los datos del nuevo producto para agregarlo al inventario.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-name">Nombre del producto</Label>
              <Input id="product-name" placeholder="Ej: Laptop HP Pavilion" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-sku">SKU</Label>
              <Input id="product-sku" placeholder="Ej: SKU-004" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="product-qty">Cantidad</Label>
                <Input id="product-qty" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-price">Precio</Label>
                <Input id="product-price" type="number" placeholder="0.00" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={() => handleOpenChange(false)}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
