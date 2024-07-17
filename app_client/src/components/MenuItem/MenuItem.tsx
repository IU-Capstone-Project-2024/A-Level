import './MenuItem.css';
import Link from 'next/link';

type tabType =
  | 'browse'
  | 'uploaded'
  | 'questions'
  | 'create'
  | 'generate'
  | null;

interface MenuItemProps {
  className: string;
  item: string;
  onClick?: () => void;
  arg: tabType;
}

export default function MenuItem({
  className,
  item,
  onClick,
  arg,
}: MenuItemProps) {
  return (
    <Link href={'/' + arg}>
      <button className={'menuItem ' + className} onClick={onClick}>
        {item}
      </button>
    </Link>
  );
}
