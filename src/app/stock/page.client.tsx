"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTransition } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/lib/actions/mutations";
import { useRouter, useSearchParams } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(2, "El nombre es requerido."),
  sku: z.string().min(1, "El SKU es requerido."),
  quantity: z.coerce
    .number()
    .int()
    .nonnegative("La cantidad debe ser 0 o mayor."),
  price: z.coerce.number().positive("El precio debe ser mayor a 0."),
});

export function StockPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const open = searchParams.get("modal") === "add-item";
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      quantity: 0,
      price: 0,
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      router.replace("/stock");
    }
  };

  const handleOpenAddItem = () => {
    router.replace("/stock?modal=add-item");
  };

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    startTransition(async () => {
      await createProduct(data);
      form.reset();
      router.replace("/stock");
    });
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
          <form
            id="add-product-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-name">
                    Nombre del producto
                  </FieldLabel>
                  <Input
                    {...field}
                    id="product-name"
                    placeholder="Ej: Laptop HP Pavilion"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="sku"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-sku">SKU</FieldLabel>
                  <Input
                    {...field}
                    id="product-sku"
                    placeholder="Ej: SKU-004"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="quantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-qty">Cantidad</FieldLabel>
                    <Input
                      {...field}
                      id="product-qty"
                      type="number"
                      placeholder="0"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-price">Precio</FieldLabel>
                    <Input
                      {...field}
                      id="product-price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </form>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" form="add-product-form" disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
