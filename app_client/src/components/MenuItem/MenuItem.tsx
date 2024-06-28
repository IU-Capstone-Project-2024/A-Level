import { SetStateAction } from 'react';
import './MenuItem.css'
import { Link } from 'react-router-dom';

type tabType = 'browse' | 'uploaded' | 'questions' |'create' | null;

interface MenuItemProps {
    className: string;
    item: string;
    arg: tabType;
}

export default function MenuItem({className, item, arg}: MenuItemProps){
    return (
        <Link to={"/"+arg}className={"menuItem " + className}>{item}</Link>
    );
}