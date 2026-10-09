
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Suspense } from "react";

import "./globals.css";

import Header from "./src/component/Header";
import Footer from "./src/component/Footer";
import Category from "./src/component/Category";
import Marque from "./src/component/Marque";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bazar Dor",
  description:
    "A modern and clean platform for checking daily market prices in Bangladesh.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="flex min-h-full flex-col">
        <Header />

        {/* <Suspense
          fallback={
            <div className="h-10 w-full animate-pulse bg-gray-100" />
          }
        >
          <Category />
        </Suspense>

        <Suspense
          fallback={
            <div className="h-[42px] w-full animate-pulse bg-[#f8fdf9]" />
          }
        >
          <Marque />
        </Suspense> */}

        <main className="flex-1 bg-[#F0F5F0]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
