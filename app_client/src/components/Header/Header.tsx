import './Header.css';
import logo from '../../images/logo.svg';
import MenuItem from '../MenuItem/MenuItem';
import { SetStateAction } from 'react';

type tabType = 'browse' | 'uploaded' | 'questions' |'create' | null;

interface ButtonProps {
    active: string | null;
    onClick: (event: SetStateAction<tabType>) => void;
    setDisplayDoc: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({active, onClick, setDisplayDoc}: ButtonProps){
    return (
        <header className="header">
            <img src={logo} alt='logo - A for A'/>
            <nav className='navigation'>
                <MenuItem className={active === 'browse' ? 'active': 'non-active'} item='Browse file' onClick={onClick} arg='browse' setDisplayDoc={setDisplayDoc}/>
                <MenuItem className={active === 'uploaded' ? 'active': 'non-active'} item='Uploaded files' onClick={onClick} arg='uploaded' setDisplayDoc={setDisplayDoc}/>
                <MenuItem className={active === 'questions' ? 'active': 'non-active'} item='Questions' onClick={onClick} arg='questions' setDisplayDoc={setDisplayDoc}/>
                <MenuItem className={active === 'create' ? 'active': 'non-active'} item='Create question' onClick={onClick} arg='create' setDisplayDoc={setDisplayDoc}/>
                <MenuItem className={active === 'generate' ? 'active': 'non-active'} item='Generate exam variant' onClick={onClick} arg={null} setDisplayDoc={setDisplayDoc}/>
            </nav>
        </header>
    );
}