import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-gotham",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Rising Sun Montessori School | Montessori Education in El Dorado Hills, CA",
    template: "%s | Rising Sun Montessori School"
  },
  description: "Rising Sun Montessori School in El Dorado Hills offers authentic Montessori education for Transitional Kindergarten through Middle School. Nurturing curious, independent, and compassionate learners since our founding.",
  keywords: [
    "Montessori school",
    "El Dorado Hills",
    "California",
    "private school",
    "elementary school",
    "middle school",
    "kindergarten",
    "Montessori education",
    "independent learning",
    "holistic education",
    "Sacramento area schools"
  ],
  authors: [{ name: "Rising Sun Montessori School" }],
  creator: "Rising Sun Montessori School",
  publisher: "Rising Sun Montessori School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://risingsunmontessori.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Rising Sun Montessori School | Authentic Montessori Education",
    description: "Discover the Montessori advantage at Rising Sun Montessori School in El Dorado Hills. Blending timeless principles with modern skills to prepare students for life, not just school.",
    url: 'https://risingsunmontessori.org',
    siteName: 'Rising Sun Montessori School',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rising Sun Montessori School Campus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rising Sun Montessori School | Authentic Montessori Education",
    description: "Discover the Montessori advantage at Rising Sun Montessori School in El Dorado Hills.",
    images: ['/og-image.jpg'],
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
    google: 'your-google-verification-code',
  },
  category: 'education',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Rising Sun Montessori School',
  alternateName: 'RSMS',
  description: 'Rising Sun Montessori School offers authentic Montessori education in El Dorado Hills, California, serving students from Transitional Kindergarten through Middle School.',
  url: 'https://risingsunmontessori.org',
  logo: 'https://risingsunmontessori.org/logo.svg',
  image: 'https://risingsunmontessori.org/og-image.jpg',
  telephone: ['+1-916-936-2333', '+1-530-350-9500'],
  email: 'info@risingsunmontessori.org',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4940 Robert J Mathews Parkway',
    addressLocality: 'El Dorado Hills',
    addressRegion: 'CA',
    postalCode: '95762',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '38.6580',
    longitude: '-121.0735',
  },
  foundingDate: '2000',
  sameAs: [
    'https://www.facebook.com/risingsunmontessori',
    'https://www.instagram.com/risingsunmontessori',
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Accreditation',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Accrediting Commission for Schools, Western Association of Schools and Colleges',
    },
  },
  educationalCredentialAwarded: [
    'Elementary School Diploma',
    'Middle School Certificate',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Educational Programs',
    itemListElement: [
      {
        '@type': 'Course',
        name: 'Transitional Kindergarten / Kindergarten',
        description: 'Montessori-based early childhood education program',
      },
      {
        '@type': 'Course',
        name: 'Lower Elementary',
        description: 'Montessori elementary education for grades 1-3',
      },
      {
        '@type': 'Course',
        name: 'Upper Elementary',
        description: 'Montessori elementary education for grades 4-6',
      },
      {
        '@type': 'Course',
        name: 'Middle School',
        description: 'Montessori-inspired middle school education for grades 7-8',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#17421E" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
