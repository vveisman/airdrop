import type { Metadata } from "next";
import { Inter, Open_Sans, Abhaya_Libre } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";

// const inter = Inter({ subsets: ["latin"] });
const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vveisman",
  description: "Epic Festive giveaway and airdrop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.png' />
      </head>
      <body
        className={`bg-gradient-to-r relative from-[#2e2c46ff] to-[#373461ff] ${inter.className}`}
      >
        <Navbar />
        <div className='w-full'>
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
