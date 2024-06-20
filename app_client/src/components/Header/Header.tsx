import './Header.css'
import logo from '../../images/logo.svg'
import MenuItem from '../MenuItem/MenuItem';

interface ButtonProps {
    active: string;
    onClick: (event: string) => void;
}

export default function Header({active, onClick}: ButtonProps){
    return (
        <header className="header">
            <img src={logo} alt='logo - A for A'/>
            <nav className='navigation'>
                <MenuItem className={active === 'browse' ? 'active': 'non-active'} item='Browse file' onClick={onClick} arg='browse'/>
                <MenuItem className={active === 'uploaded' ? 'active': 'non-active'} item='Uploaded files' onClick={onClick} arg='uploaded'/>
                <MenuItem className={active === 'questions' ? 'active': 'non-active'} item='Questions' onClick={onClick} arg='questions'/>
                <MenuItem className={active === 'create' ? 'active': 'non-active'} item='Create question' onClick={onClick} arg='create'/>
                <MenuItem className={active === 'generate' ? 'active': 'non-active'} item='Generate exam variant' onClick={onClick} arg='generate'/>
            </nav>
        </header>
    );
}