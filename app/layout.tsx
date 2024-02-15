import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Baby Blotter 🚨",
  description: "a blotter for the next generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="relative min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
