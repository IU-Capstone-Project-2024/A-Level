'use client';
import ContactLink from '../ContactLink/ContactLink';
import './Footer.css';
// prettier-ignore-start
import Github from '../../images/mdi_github.svg';
import Telegram from '../../images/ic_baseline-telegram.svg';
import Email from '../../images/ic_twotone-alternate-email.svg';
import logo from '../../images/logoLight.svg';
// prettier-ignore-end
import { useTab } from '../../context/TabContext';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const { setTab } = useTab();
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <div className="pages-links">
          <Link href="/" onClick={() => setTab(null)} className="link-footer">
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setTab(null)}
            className="link-footer"
          >
            About us
          </Link>
        </div>
        <div className="contact-links">
          <ContactLink
            id="gh-link"
            reference="https://github.com/IU-Capstone-Project-2024/A-Level"
            source={Github}
            alt="GitHub"
          />
          <ContactLink
            id="email"
            reference="mailto:n.abdullaev@innopolis.university"
            source={Email}
            alt="Telegram"
          />
          <ContactLink
            id="tg-link"
            reference="https://t.me/nursabd"
            source={Telegram}
            alt="Telegram"
          />
        </div>
      </div>
      <div className="bottom-footer">
        <h4 className="year-footer">2024</h4>
        <Image className="logo" src={logo} alt="logo - A for A" />
        <a href="#top" className="link-footer">
          Back to Top
        </a>
      </div>
    </footer>
  );
}
