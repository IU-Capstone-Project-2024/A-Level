import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Create question',
    description:
      'Create an A-Level economics related question, if you could not find it in our database',
  };
}

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

