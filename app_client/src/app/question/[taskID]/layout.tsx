import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'View Question',
    description: `View/Edit/Delete the chosen question`
  }
}

export default function QuestionLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return children
}