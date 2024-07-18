import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'All documents',
    description: `View all the stored exam documents`
  }
}

export default function UploadedLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return children
}