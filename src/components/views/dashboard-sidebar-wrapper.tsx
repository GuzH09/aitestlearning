"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { DashboardAppSidebar } from "@/components/views/dashboard-app-sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ViewTransition } from "react";

const pageHeaders: Record<string, string> = {
  "/home": "Inicio",
  "/sales": "Ventas",
  "/stock": "Inventario",
  "/configuration": "Configuración",
};

export default function DashboardSidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = pageHeaders[pathname] || "Dashboard";

  return (
    <SidebarProvider>
      <DashboardAppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="cursor-pointer -ml-1 text-primary" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-lg font-semibold text-gray-900">{pageTitle}</h1>
        </header>
        <main className="flex-1 overflow-auto bg-gray-50 p-4">{children}</main>
        <footer className="flex min-h-[200px] flex-col bg-gray-50 px-2 py-4">
          <Separator orientation="horizontal" />

          <span className="mx-auto mb-2 w-3/4 border-b border-gray-200"></span>
          <div className="mx-auto flex w-3/4 flex-col items-center justify-end gap-4 md:flex-row">
            <Link
              href="/dashboard/privacy-policy"
              className="text-sm text-gray-500 hover:underline"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/dashboard/terms"
              className="text-sm text-gray-500 hover:underline"
            >
              Términos y Condiciones
            </Link>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
