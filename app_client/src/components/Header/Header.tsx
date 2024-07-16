'use client';
import './Header.css';
import logo from '../../images/logo.svg';
import MenuItem from '../MenuItem/MenuItem';
import { useState } from 'react';
import IconButton from '../IconButton/IconButton';
import Menu from '../../images/lucide_menu.svg';
import OutsideClickHandler from 'react-outside-click-handler';
import Close from '../../images/ic_round-close.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useTab } from '../../context/TabContext';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { tab, setTab } = useTab();

  const handleNavToggle = () => {
    setIsNavOpen((prev) => !prev);
  };

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
            onClick={setTab}
            arg="browse"
          />
          <MenuItem
            className={tab === 'uploaded' ? 'active' : 'non-active'}
            item="Uploaded files"
            onClick={setTab}
            arg="uploaded"
          />
          <MenuItem
            className={tab === 'questions' ? 'active' : 'non-active'}
            item="Questions"
            onClick={setTab}
            arg="questions"
          />
          <MenuItem
            className={tab === 'create' ? 'active' : 'non-active'}
            item="Create question"
            onClick={setTab}
            arg="create"
          />
          <MenuItem
            className={tab === 'generate' ? 'active' : 'non-active'}
            item="Generate exam variant"
            onClick={setTab}
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
              onClick={(event) => {
                setIsNavOpen(false), setTab(event);
              }}
              arg="browse"
            />
            <MenuItem
              className={tab === 'uploaded' ? 'active' : 'non-active'}
              item="Uploaded files"
              onClick={(event) => {
                setIsNavOpen(false), setTab(event);
              }}
              arg="uploaded"
            />
            <MenuItem
              className={tab === 'questions' ? 'active' : 'non-active'}
              item="Questions"
              onClick={(event) => {
                setIsNavOpen(false), setTab(event);
              }}
              arg="questions"
            />
            <MenuItem
              className={tab === 'create' ? 'active' : 'non-active'}
              item="Create question"
              onClick={(event) => {
                setIsNavOpen(false), setTab(event);
              }}
              arg="create"
            />
            <MenuItem
              className={tab === 'generate' ? 'active' : 'non-active'}
              item="Generate exam variant"
              onClick={(event) => {
                setIsNavOpen(false), setTab(event);
              }}
              arg="generate"
            />
          </nav>
        </aside>
      </OutsideClickHandler>
    </>
  );
}
