import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- JANGAN HAPUS BARIS INI

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VTC System",
  description: "Aplikasi Perpajakan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
