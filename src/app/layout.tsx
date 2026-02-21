import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "@/app/globals.css";
import DashboardSidebarWrapper from "@/components/views/dashboard-sidebar-wrapper";
import { Toaster } from "@/components/ui/sonner";

const rubik = Rubik({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Test Learning",
  description: "AI Test Learning",
  keywords: ["AI", "Test", "Learning"],
  authors: [{ name: "AI Test Learning", url: "" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Test Learning",
    description: "AI Test Learning",
    url: "",
    siteName: "AI Test Learning",
    type: "website",
    images: [
      {
        url: "",
        width: 1200,
        height: 675,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Test Learning",
    description: "",
    creator: "@guzhotero",
    images: [""],
  },
  alternates: { canonical: "" },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${rubik.className} antialiased`}>
        <DashboardSidebarWrapper>
          {children}
          <Toaster />
        </DashboardSidebarWrapper>
      </body>
    </html>
  );
}
