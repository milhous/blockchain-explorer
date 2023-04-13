import dynamic from 'next/dynamic';
import React from 'react';

import './globals.scss';
import {LayoutProps} from '.next/types/app/layout';

export const metadata = {
  title: {
    default: "Milhous's Blockchain Explorer",
    template: '%s | Milhouscan',
  },
  generator: 'Milhouscan',
  applicationName: 'Milhouscan',
  referrer: 'origin-when-cross-origin',
  keywords: ['Milhouscan', 'Blockchain Explorer'],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Milhous's Blockchain Explorer",
    description: 'Build A Blockchain Explorer With Hyperledger Iroha And Next.Js',
    url: 'https://scan.milhous.me/',
    siteName: 'Milhouscan',
    locale: 'en-US',
    type: 'website',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: LayoutProps) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
