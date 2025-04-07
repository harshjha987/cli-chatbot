import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto_Slab } from "next/font/google"
const robotoSlab = Roboto_Slab({ subsets: ["latin"], variable: "--font-roboto-slab" })

import { ThemeProvider } from "../components/theme-provider"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Bot",
  description: "A simple chatbot using gemini api key.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable}  ${robotoSlab.variable} font-roboto-slab ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
       {children}
       </ThemeProvider>
      </body>
    </html>
  );
}
