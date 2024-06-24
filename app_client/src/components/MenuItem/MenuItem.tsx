import { SetStateAction } from 'react';
import './MenuItem.css'

type tabType = 'browse' | 'uploaded' | 'questions' |'create' | null;

interface MenuItemProps {
    className: string;
    item: string;
    onClick: (event: SetStateAction<tabType>) => void;
    arg: tabType;
    setDisplayDoc: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuItem({className, item, onClick, arg, setDisplayDoc}: MenuItemProps){
    return (
        <button className={"menuItem " + className} onClick={() => {onClick(arg); setDisplayDoc(false);}}>{item}</button>
    );
}