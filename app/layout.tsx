import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(src)/component/Header";
import Footer from "./(src)/component/Footer";
import Category from "./(src)/component/Category";
import Marque from "./(src)/component/Marque";
import { Suspense } from "react";

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
  description: "A modern and clean e-commerce platform built with React, Next.js, and Tailwind CSS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="min-h-full flex flex-col">
        <div>
          <Header />
          <Suspense fallback={<div className="h-10 w-full animate-pulse bg-gray-100" />}>
            <Category />
          </Suspense>

          <Suspense fallback={<div className="h-[42px] w-full animate-pulse bg-[#f8fdf9]" />}>
            <Marque />
          </Suspense>
          <main className="bg-[#F0F5F0]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
