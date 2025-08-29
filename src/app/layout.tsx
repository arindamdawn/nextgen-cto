import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PerformanceMonitor from "@/components/animations/PerformanceMonitor";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NextGen-CTO | Master Code, Design, AI & Leadership",
  description: "Become the CTO of Tomorrow. Join our waitlist for upcoming courses in coding, design, AI, and leadership skills. Comprehensive training for technical leaders.",
  keywords: ["CTO", "coding", "design", "AI", "leadership", "courses", "programming", "technical leadership", "software engineering", "machine learning"],
  authors: [{ name: "NextGen-CTO" }],
  creator: "NextGen-CTO",
  publisher: "NextGen-CTO",
  category: "Education",
  openGraph: {
    title: "NextGen-CTO | Master Code, Design, AI & Leadership",
    description: "Become the CTO of Tomorrow. Join our waitlist for upcoming courses in coding, design, AI, and leadership skills.",
    type: "website",
    locale: "en_US",
    siteName: "NextGen-CTO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextGen-CTO - Master Code, Design, AI & Leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen-CTO | Master Code, Design, AI & Leadership",
    description: "Become the CTO of Tomorrow. Join our waitlist for upcoming courses.",
    creator: "@nextgencto",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth-enhanced">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//i.ytimg.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "NextGen-CTO",
              "description": "Comprehensive courses covering coding, design, AI, and leadership skills for aspiring CTOs",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://nextgen-cto.com",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://nextgen-cto.com"}/logo.png`
              },
              "offers": {
                "@type": "Offer",
                "category": "Education",
                "name": "CTO Leadership Courses",
                "description": "Comprehensive courses covering coding, design, AI, and leadership skills for aspiring CTOs"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Software Engineers, Technical Leaders, Aspiring CTOs"
              },
              "educationalLevel": "Professional Development",
              "teaches": [
                "Software Engineering",
                "AI and Machine Learning", 
                "Design Thinking",
                "Technical Leadership",
                "System Architecture"
              ]
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <PerformanceMonitor showDebugInfo={process.env.NODE_ENV === 'development'} threshold={55} />
      </body>
    </html>
  );
}
