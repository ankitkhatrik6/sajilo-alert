import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SajiloAlert — Alert & Toast Library',
  description: 'A modern, zero-dependency JavaScript/TypeScript alert, modal, confirmation, loading, and toast library with Nepali visual identity and bilingual support.',
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'SajiloAlert — Simple alerts',
    description: 'A modern, zero-dependency JavaScript/TypeScript alert, modal, and toast notification library.',
    type: 'website',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'SajiloAlert Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SajiloAlert — Simple alerts',
    description: 'A modern, zero-dependency JavaScript/TypeScript alert, modal, and toast notification library.',
    images: ['/preview.png'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
