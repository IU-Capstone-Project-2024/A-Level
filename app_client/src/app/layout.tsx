import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { TabProvider } from '@/context/TabContext';
import { TopicsProvider } from '@/context/TopicContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'A for A',
  description: 'Transform A-level Economics Revision',
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
