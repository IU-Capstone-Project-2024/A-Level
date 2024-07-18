import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Exam',
  description:
    'Upload an existing A-level economics exam variant to the application',
};

export default function BrowseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
