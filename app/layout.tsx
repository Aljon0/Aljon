import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-context";
import { ChatWidget } from "@/components/layout/chat-widget"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Al-jon Santiago | Full Stack AI Developer",
  description: "Full Stack AI Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          {/* Chat Widget floats on every page */}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}