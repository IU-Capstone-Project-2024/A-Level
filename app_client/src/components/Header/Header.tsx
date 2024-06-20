import './Header.css'
import logo from '../../images/logo.svg'
import MenuItem from '../MenuItem/MenuItem';

interface ButtonProps {
    onClick: (event: string) => void;
}

export default function Header({onClick}: ButtonProps){
    return (
        <header className="header">
            <img src={logo} alt='logo - A for A'/>
            <nav className='navigation'>
                <MenuItem item='Browse file' onClick={onClick} arg='browse'/>
                <MenuItem item='Uploaded files' onClick={onClick} arg='uploaded'/>
                <MenuItem item='Questions' onClick={onClick} arg='questions'/>
                <MenuItem item='Create question' onClick={onClick} arg='create'/>
                <MenuItem item='Generate exam variant' onClick={onClick} arg='generate'/>
            </nav>
        </header>
    );
}