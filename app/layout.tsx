import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(src)/component/Header";
import Nav from "./(src)/component/Nav";

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
          <main className="bg-[#F0F5F0]">{children}</main>
          <Nav />
        </div>
      </body>
    </html>
  );
}
