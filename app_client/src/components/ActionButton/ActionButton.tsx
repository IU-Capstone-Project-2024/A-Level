'use client';
import Link from 'next/link';
import './ActionButton.css';
import { useTab } from '@/context/TabContext';

interface ActionButtonProps {
  title: string;
}

export default function ActionButton({ title }: ActionButtonProps) {
  const { setTab } = useTab();
  return (
    <Link href="/browse">
      <button onClick={() => setTab('browse')} className="action_button">
        {title}
      </button>
    </Link>
  );
}
