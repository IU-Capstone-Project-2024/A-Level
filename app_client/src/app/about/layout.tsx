import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Experience the difference with AforA, where we're dedicated to enhancing your A-level Economics revision journey. Whether you're striving to excel in exams or deepen your understanding of economics, AforA is your trusted companion, ready to assist you at every stage.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

