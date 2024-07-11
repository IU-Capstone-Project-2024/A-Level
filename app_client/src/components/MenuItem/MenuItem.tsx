import { SetStateAction } from 'react';
import './MenuItem.css';
import { Link } from 'react-router-dom';

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
  onClick: (event: SetStateAction<tabType>) => void;
  arg: tabType;
}

export default function MenuItem({
  className,
  item,
  onClick,
  arg,
}: MenuItemProps) {
  return (
    <Link to={'/' + arg}>
      <button className={'menuItem ' + className} onClick={() => onClick(arg)}>
        {item}
      </button>
    </Link>
  );
}
