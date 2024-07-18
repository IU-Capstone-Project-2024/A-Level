import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'View Exam',
    description: `Review the chosen exam variant's questions`
  }
}

export default function DocumentLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return children
}