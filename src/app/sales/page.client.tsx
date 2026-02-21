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
import { createSale } from "@/lib/actions/mutations";
import { useRouter, useSearchParams } from "next/navigation";

const saleSchema = z.object({
  client: z.string().min(2, "El cliente es requerido."),
  date: z.string().min(1, "La fecha es requerida."),
  total: z.coerce.number().positive("El total debe ser mayor a 0."),
});

export function SalesPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const open = searchParams.get("modal") === "create-sale";
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof saleSchema>>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      client: "",
      date: new Date().toISOString().split("T")[0],
      total: 0,
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      router.replace("/sales");
    }
  };

  const handleOpenCreateSale = () => {
    router.replace("/sales?modal=create-sale");
  };

  const onSubmit = (data: z.infer<typeof saleSchema>) => {
    startTransition(async () => {
      await createSale(data);
      form.reset();
      router.replace("/sales");
    });
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
          <form
            id="create-sale-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <Controller
              name="client"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sale-client">Cliente</FieldLabel>
                  <Input
                    {...field}
                    id="sale-client"
                    placeholder="Nombre del cliente"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sale-date">Fecha</FieldLabel>
                  <Input
                    {...field}
                    id="sale-date"
                    type="date"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="total"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sale-total">Total</FieldLabel>
                  <Input
                    {...field}
                    id="sale-total"
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
          </form>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" form="create-sale-form" disabled={isPending}>
              {isPending ? "Guardando..." : "Registrar Venta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
