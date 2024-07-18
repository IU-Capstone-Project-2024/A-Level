import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'All Questions',
    description: `View all the stored questions`
  }
}

export default function QuestionsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return children
}