import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Topbar from "./ui/topbar/topbar";
import Provider from "@/app/ui/provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minhyeok's Diary",
  description: "Diary of Minhyeok Seo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} border-b-2 border-gray-300 antialiased`}
      >
        <Provider>
          <Topbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
