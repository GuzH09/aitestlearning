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
import { updateConfig } from "@/lib/actions/mutations";
import type { Config } from "@/lib/data/store";
import { useRouter, useSearchParams } from "next/navigation";

const configSchema = z.object({
  storeName: z.string().min(1, "El nombre es requerido."),
  currency: z.string().min(1, "La moneda es requerida."),
  timezone: z.string().min(1, "La zona horaria es requerida."),
});

export function ConfigurationPageClient({ config }: { config: Config }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const open = searchParams.get("modal") === "change-setting";
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof configSchema>>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      storeName: config.storeName,
      currency: config.currency,
      timezone: config.timezone,
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      router.replace("/configuration");
    }
  };

  const handleOpenChangeSetting = () => {
    router.replace("/configuration?modal=change-setting");
  };

  const onSubmit = (data: z.infer<typeof configSchema>) => {
    startTransition(async () => {
      await updateConfig(data);
      router.replace("/configuration");
    });
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
          <form
            id="update-config-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <Controller
              name="storeName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="setting-store-name">
                    Nombre de la tienda
                  </FieldLabel>
                  <Input
                    {...field}
                    id="setting-store-name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="currency"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="setting-currency">Moneda</FieldLabel>
                  <Input
                    {...field}
                    id="setting-currency"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="timezone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="setting-timezone">
                    Zona horaria
                  </FieldLabel>
                  <Input
                    {...field}
                    id="setting-timezone"
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
            <Button
              type="submit"
              form="update-config-form"
              disabled={isPending}
            >
              {isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
