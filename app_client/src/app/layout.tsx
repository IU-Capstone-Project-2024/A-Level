import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { TabProvider } from '@/context/TabContext';
import { TopicsProvider } from '@/context/TopicContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | A4A',
    default: 'A for A'
  },
  description: 'Transform A-level Economics Revision',
  authors: [
    {name: 'Alisher Kabardiyadi', url: 'https://github.com/justcgh9'},
    {name: 'Kira Strelnikova'},
    {name: 'Nursultan Abdullaev'},
    {name: 'Ruslan Izmailov'},
    {name: 'Ammar Meslmani'}
  ],
  applicationName: 'A for A',
  referrer: 'origin-when-cross-origin',
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
  openGraph: {
    title: "A for A",
    description: "Transform A-level Economics Revision",
    url: "https://a-level-pages.dev",
    siteName: "A for A",
    type: "website",
    images: [
      {
        url: 'https://a-level-pages.dev/preview.png'
      },
    ]
  },
  appLinks: {
    web: {
      url: 'https://a-level.pages.dev',
      should_fallback: true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <TabProvider>
          <TopicsProvider>
            <div id="modal-portal" />
            <Header />
            {children}
            <Footer />
          </TopicsProvider>
        </TabProvider>
      </body>
    </html>
  );
}
