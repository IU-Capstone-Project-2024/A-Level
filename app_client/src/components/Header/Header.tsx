import './Header.css';
import logo from '../../images/logo.svg';
import MenuItem from '../MenuItem/MenuItem';
import { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '../IconButton/IconButton';
import Menu from '../../images/lucide_menu.svg';
import OutsideClickHandler from 'react-outside-click-handler';
import Close from '../../images/ic_round-close.svg';

type tabType =
  | 'browse'
  | 'uploaded'
  | 'questions'
  | 'create'
  | 'generate'
  | null;

interface ButtonProps {
  active: string | null;
  onClick: (event: SetStateAction<tabType>) => void;
}

export default function Header({ active, onClick }: ButtonProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <header className="header" id="top">
        <Link
          to="/"
          onClick={() => {
            onClick(null);
            active = null;
          }}
        >
          <img id="logo" src={logo} alt="logo - A for A" />
        </Link>
        <nav className="navigation">
          <MenuItem
            className={active === 'browse' ? 'active' : 'non-active'}
            item="Browse file"
            onClick={onClick}
            arg="browse"
          />
          <MenuItem
            className={active === 'uploaded' ? 'active' : 'non-active'}
            item="Uploaded files"
            onClick={onClick}
            arg="uploaded"
          />
          <MenuItem
            className={active === 'questions' ? 'active' : 'non-active'}
            item="Questions"
            onClick={onClick}
            arg="questions"
          />
          <MenuItem
            className={active === 'create' ? 'active' : 'non-active'}
            item="Create question"
            onClick={onClick}
            arg="create"
          />
          <MenuItem
            className={active === 'generate' ? 'active' : 'non-active'}
            item="Generate exam variant"
            onClick={onClick}
            arg="generate"
          />
        </nav>
        <IconButton
          id="aside-menu"
          icon={Menu}
          alt="Servuces"
          title="Services"
          onClick={handleNavToggle}
        />
      </header>
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsNavOpen(false);
        }}
      >
        <aside className={`aside-nav ${isNavOpen ? 'open' : ''}`}>
          <IconButton
            icon={Close}
            alt="Close"
            onClick={() => {
              setIsNavOpen(false);
            }}
          />
          <nav className="navigation-aside">
            <MenuItem
              className={active === 'browse' ? 'active' : 'non-active'}
              item="Browse file"
              onClick={(event) => {
                setIsNavOpen(false), onClick(event);
              }}
              arg="browse"
            />
            <MenuItem
              className={active === 'uploaded' ? 'active' : 'non-active'}
              item="Uploaded files"
              onClick={(event) => {
                setIsNavOpen(false), onClick(event);
              }}
              arg="uploaded"
            />
            <MenuItem
              className={active === 'questions' ? 'active' : 'non-active'}
              item="Questions"
              onClick={(event) => {
                setIsNavOpen(false), onClick(event);
              }}
              arg="questions"
            />
            <MenuItem
              className={active === 'create' ? 'active' : 'non-active'}
              item="Create question"
              onClick={(event) => {
                setIsNavOpen(false), onClick(event);
              }}
              arg="create"
            />
            <MenuItem
              className={active === 'generate' ? 'active' : 'non-active'}
              item="Generate exam variant"
              onClick={(event) => {
                setIsNavOpen(false), onClick(event);
              }}
              arg="generate"
            />
          </nav>
        </aside>
      </OutsideClickHandler>
    </>
  );
}
