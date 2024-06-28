import './Header.css';
import logo from '../../images/logo.svg';
import MenuItem from '../MenuItem/MenuItem';

type tabType = 'browse' | 'uploaded' | 'questions' |'create' | 'generate'| null;

interface ButtonProps {
    active: tabType;
}

export default function Header({active}: ButtonProps){
    return (
        <header className="header">
            <img src={logo} alt='logo - A for A'/>
            <nav className='navigation'>
                <MenuItem className={active === 'browse' ? 'active': 'non-active'} item='Browse file' arg='browse'/>
                <MenuItem className={active === 'uploaded' ? 'active': 'non-active'} item='Uploaded files' arg='uploaded'/>
                <MenuItem className={active === 'questions' ? 'active': 'non-active'} item='Questions' arg='questions'/>
                <MenuItem className={active === 'create' ? 'active': 'non-active'} item='Create question' arg='create'/>
                <MenuItem className={active === 'generate' ? 'active': 'non-active'} item='Generate exam variant' arg={null}/>
            </nav>
        </header>
    );
}