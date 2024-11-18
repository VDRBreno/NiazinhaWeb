import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

import useLang from '@/hooks/useLang';
import NiazinhaLogo from '@/assets/svg/niazinha_logo.svg';
import Button from '@/components/Button';
import SideMenu from '@/layouts/SideMenu';

import styles from './styles.module.scss';

export default function Header() {
  
  const { LangKey } = useLang();

  const headerHeight = 150;
  const headerFixedStateOffset = 30;
  const isWindowOffsetEnoughToFixedHeaderOffset = () => window.scrollY > headerFixedStateOffset;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [showFixedHeader, setShowFixedHeader] = useState(isWindowOffsetEnoughToFixedHeaderOffset());

  function toggleSideMenuState() {
    setIsSideMenuOpen(state => !state);
  }

  function handleOnChangeSideMenuState() {
    if(isSideMenuOpen) {
      document.body.classList.add('sidemenu-overflow-hidden')
    } else {
      document.body.classList.remove('sidemenu-overflow-hidden');
    }
  }

  function handleOnScroll() {
    setShowFixedHeader(isWindowOffsetEnoughToFixedHeaderOffset());
  }

  useEffect(() => {
    handleOnChangeSideMenuState();
  }, [isSideMenuOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleOnScroll);
    return () => {
      window.removeEventListener('scroll', handleOnScroll);
      document.body.classList.remove('sidemenu-overflow-hidden');
    };
  }, []);

  return (<>
    <div style={{ minHeight: headerHeight }} />

    <div id={styles.Container} className={`${showFixedHeader ?styles.ContainerSticky :''}`}>
      <Link to={`/${LangKey}/`}>
        <img className={styles.Logo} src={NiazinhaLogo} alt='Niazinha logo' />
      </Link>

      <div className={styles.InLine}>
        <Button
          props={{ "aria-label": 'Open side menu', style: { background: 'none' } }}
          onClick={toggleSideMenuState}
        >
          <FiMenu size={25} color='#FFFFFF' />
        </Button>
      </div>
    </div>

    <SideMenu isSideMenuOpen={isSideMenuOpen} toggleSideMenuState={toggleSideMenuState} />
  </>);
}