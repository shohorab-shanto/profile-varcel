import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { apiService } from "@/lib/api";
import ClientLayout from "@/components/layout/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shohorab Ahmed | Senior Full-Stack Developer",
  description: "Modern developer portfolio of Shohorab Ahmed, Senior Full-Stack Developer specializing in Laravel, Next.js, and AI applications.",
};

async function getProfile() {
  try {
    return await apiService.getProfile();
  } catch (error) {
    console.error("Failed to fetch profile for layout:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout profile={profile}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
