import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToasterProvider } from "@/components/toaster-provider";
import { CrispProvider } from "@/components/crisp-provider";
import { ModelProvider } from "@/components/model-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EgyBot",
  description: "AI platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        <ModelProvider />
          <CrispProvider />
          <ToasterProvider />
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
