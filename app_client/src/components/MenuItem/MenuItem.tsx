import './MenuItem.css'

interface MenuItemProps {
    item: string;
    onClick: (event: string) => void;
    arg: string;
}

export default function MenuItem({item, onClick, arg}: MenuItemProps){
    return (
        <button className="menuItem" onClick={() => onClick(arg)}>{item}</button>
    );
}