import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NextGen-CTO | Master Code, Design, AI & Leadership",
  description: "Become the CTO of Tomorrow. Join our waitlist for upcoming courses in coding, design, AI, and leadership skills.",
  keywords: ["CTO", "coding", "design", "AI", "leadership", "courses", "programming"],
  authors: [{ name: "NextGen-CTO" }],
  openGraph: {
    title: "NextGen-CTO | Master Code, Design, AI & Leadership",
    description: "Become the CTO of Tomorrow. Join our waitlist for upcoming courses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
