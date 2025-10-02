import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export default function SEO({
  title = "NextGen-CTO | Master Code, Design, AI & Leadership",
  description = "Become the CTO of Tomorrow. Join our waitlist for upcoming courses in coding, design, AI, and leadership skills. Comprehensive training for technical leaders.",
  keywords = ["CTO", "coding", "design", "AI", "leadership", "courses", "programming", "technical leadership", "software engineering", "machine learning"],
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  structuredData,
}: SEOProps) {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "NextGen-CTO",
    "description": description,
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": {
      "@type": "ImageObject",
      "url": `${typeof window !== 'undefined' ? window.location.origin : ''}/images/next-gen-cto-logo.png`
    },
    "sameAs": [
      "https://twitter.com/nextgencto",
      "https://www.linkedin.com/company/next-gen-cto",
      "https://github.com/team-codebug/"
    ],
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
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="NextGen-CTO" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="NextGen-CTO - Master Code, Design, AI & Leadership" />
      <meta property="og:site_name" content="NextGen-CTO" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="NextGen-CTO - Master Code, Design, AI & Leadership" />
      <meta name="twitter:creator" content="@nextgencto" />
      <meta name="twitter:site" content="@nextgencto" />
      
      {/* Additional Meta Tags for Performance */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.youtube.com" />
      <link rel="dns-prefetch" href="//i.ytimg.com" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData),
        }}
      />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/images/next-gen-cto-logo.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/next-gen-cto-logo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/next-gen-cto-logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/next-gen-cto-logo.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}