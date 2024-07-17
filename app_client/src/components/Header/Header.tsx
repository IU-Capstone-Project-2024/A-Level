'use client';
import './Header.css';
import logo from '../../images/logo.svg';
import MenuItem from '../MenuItem/MenuItem';
import { useEffect, useState } from 'react';
import IconButton from '../IconButton/IconButton';
import Menu from '../../images/lucide_menu.svg';
import OutsideClickHandler from 'react-outside-click-handler';
import Close from '../../images/ic_round-close.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useTab } from '../../context/TabContext';
import { usePathname } from 'next/navigation';

type TabType =
  | 'browse'
  | 'uploaded'
  | 'questions'
  | 'create'
  | 'generate'
  | 'saved'
  | 'about'
  | ''
  | 'document'
  | 'question'
  | null;

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { tab, setTab } = useTab();
  const pathname = usePathname();

  const handleNavToggle = () => {
    setIsNavOpen((prev) => !prev);
  };

  useEffect(() => {
    const path: TabType = pathname.split('/')[1] as TabType;
    setTab(path);
  }, [pathname, tab]);

  return (
    <>
      <header className="header" id="top">
        <Link
          href="/"
          onClick={() => {
            setTab(null);
          }}
        >
          <Image id="logo" src={logo} alt="logo - A for A" />
        </Link>
        <nav className="navigation">
          <MenuItem
            className={tab === 'browse' ? 'active' : 'non-active'}
            item="Browse file"
            arg="browse"
          />
          <MenuItem
            className={tab === 'uploaded' ? 'active' : 'non-active'}
            item="Uploaded files"
            arg="uploaded"
          />
          <MenuItem
            className={tab === 'questions' ? 'active' : 'non-active'}
            item="Questions"
            arg="questions"
          />
          <MenuItem
            className={tab === 'create' ? 'active' : 'non-active'}
            item="Create question"
            arg="create"
          />
          <MenuItem
            className={tab === 'generate' ? 'active' : 'non-active'}
            item="Generate exam variant"
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
              className={tab === 'browse' ? 'active' : 'non-active'}
              item="Browse file"
              onClick={() => {
                setIsNavOpen(false);
              }}
              arg="browse"
            />
            <MenuItem
              className={tab === 'uploaded' ? 'active' : 'non-active'}
              item="Uploaded files"
              onClick={() => {
                setIsNavOpen(false);
              }}
              arg="uploaded"
            />
            <MenuItem
              className={tab === 'questions' ? 'active' : 'non-active'}
              item="Questions"
              onClick={() => {
                setIsNavOpen(false);
              }}
              arg="questions"
            />
            <MenuItem
              className={tab === 'create' ? 'active' : 'non-active'}
              item="Create question"
              onClick={() => {
                setIsNavOpen(false);
              }}
              arg="create"
            />
            <MenuItem
              className={tab === 'generate' ? 'active' : 'non-active'}
              item="Generate exam variant"
              onClick={() => {
                setIsNavOpen(false);
              }}
              arg="generate"
            />
          </nav>
        </aside>
      </OutsideClickHandler>
    </>
  );
}
