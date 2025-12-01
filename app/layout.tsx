import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Chen - Senior Software Engineer | Terminal Portfolio",
  description:
    "Interactive terminal portfolio of a senior software engineer with 6+ years of experience in full-stack development, backend architecture, and cloud infrastructure.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "backend engineer",
    "portfolio",
    "terminal",
    "TypeScript",
    "Node.js",
    "React",
    "AWS",
    "Docker",
  ],
  authors: [{ name: "Alex Chen" }],
  creator: "Alex Chen",
  openGraph: {
    title: "Alex Chen - Senior Software Engineer | Terminal Portfolio",
    description:
      "Interactive terminal portfolio showcasing projects, experience, and skills of a senior software engineer.",
    type: "website",
    locale: "en_US",
    siteName: "Alex Chen Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen - Senior Software Engineer | Terminal Portfolio",
    description:
      "Interactive terminal portfolio of a senior software engineer with 6+ years of experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
