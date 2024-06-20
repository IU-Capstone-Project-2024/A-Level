import './MenuItem.css'

interface MenuItemProps {
    className: string;
    item: string;
    onClick: (event: string) => void;
    arg: string;
}

export default function MenuItem({className, item, onClick, arg}: MenuItemProps){
    return (
        <button className={"menuItem " + className} onClick={() => onClick(arg)}>{item}</button>
    );
}