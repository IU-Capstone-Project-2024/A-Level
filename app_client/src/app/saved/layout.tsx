import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Successfully saved',
    description: `Question is successfully saved`
  }
}

export default function SavedLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return children
}