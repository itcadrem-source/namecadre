import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import HostvibeHeadAssets from "@/components/hostvibe/includes/head";
import HostvibeFooterScripts from "@/components/hostvibe/includes/footer-scripts";
import "swiper/css/bundle";
import "./globals.css";
import "./hostvibe-header.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "NameCadre | Hostvibe React Port",
  description: "Hostvibe-inspired hosting landing page rebuilt in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <HostvibeHeadAssets />
      </head>
      <body className="hvx-theme-light min-h-full flex flex-col">
        {children}
        <HostvibeFooterScripts />
      </body>
    </html>
  );
}
