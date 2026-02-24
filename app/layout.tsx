import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Collabify | The New Standard of Influence",
  description: "Connect visionary brands with creators who define culture. Intelligence-driven influence, delivered at scale.",
};

import { ChatBot } from "@/components/ChatBot";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
        <ChatBot />
      </body>
    </html>
  );
}