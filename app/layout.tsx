import type { Metadata } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["600", "700", "800"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "GearUp — Rent Sports & Outdoor Gear Instantly",
  description: "Browse, book, and pick up sports and outdoor gear near you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${inter.variable} ${plexMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
