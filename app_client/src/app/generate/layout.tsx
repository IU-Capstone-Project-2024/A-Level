import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Generate Exam',
    description: `Generate an A-Level styled exam variant using random questions from our database`
  }
}

export default function GenerateLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return children
}