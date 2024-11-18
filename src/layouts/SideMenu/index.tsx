import { Link, useNavigate } from 'react-router-dom';
import { FiGlobe, FiX } from 'react-icons/fi';

import { getLangKey, LangKeys } from '@/i18n';
import useLang from '@/hooks/useLang';
import Dropdown, { IOption } from '@/components/Dropdown';
import Button from '@/components/Button';
import DiscordLogo from '@/assets/svg/discord_logo.svg';
import WarpIcon from '@/assets/svg/warp_icon.svg';
import BannersHistoryIcon from '@/assets/svg/banners_history_icon.svg';
import CharactersIcon from '@/assets/svg/characters_icon.svg';
import LightConesIcon from '@/assets/svg/light_cones_icon.svg';
import RelicIcon from '@/assets/svg/relic_icon.svg';

import styles from './styles.module.scss';

interface SideMenuProps {
  isSideMenuOpen: boolean;
  toggleSideMenuState: () => void;
}

export default function SideMenu({
  isSideMenuOpen,
  toggleSideMenuState
}: SideMenuProps) {
  
  const { changeLang, LangKey, Lang } = useLang();
  const navigate = useNavigate();

  const LangOptions: IOption[] = LangKeys.map(item => ({ id: item.key, value: item.label }));

  async function changeDropdownValue(option: IOption) {
    const langKey = getLangKey(option.id);
    if(langKey===LangKey) return;
    
    const newURL = await changeLang(langKey);
    
    if(newURL)
      navigate(newURL);
  }

  return (
    <div id={styles.Container} className={`${isSideMenuOpen ?styles.ContainerActive :''}`}>
      <div className={styles.Header}>
        <div className={styles.InLine}>
          <span className={styles.Title}>Niazinha</span>
          <Dropdown
            options={LangOptions}
            defaultValueId={LangKey}
            onChange={changeDropdownValue}
            elementOnPreview={{
              element: <FiGlobe size={17} color='#FFFFF' />,
              side: 'left'
            }}
          />
        </div>
        <Button props={{ 'aria-label': 'Close side menu' }} onClick={toggleSideMenuState}>
          <FiX size={25} color='#FFFFFF' />
        </Button>
      </div>

      <div className={styles.NavContainer}>
        <Link to={`/${LangKey}/discord`} target='_blank'>
          <Button props={{ 'aria-label': 'Open Discord', style: { backgroundColor: '#5865F2', height: 'auto' } }}>
            <img src={DiscordLogo} alt='Discord logo' width={23} />
            <span style={{ fontWeight: '700' }}>Discord</span>
          </Button>
        </Link>
      </div>
      <div className={styles.NavContainer}>
        <Link to={`/${LangKey}/warp`}>
          <div className={styles.NavOption}>
            <img className={styles.NavIcon} src={WarpIcon} alt='Warp history icon' />
            <span className={styles.NavText}>{Lang['Sidemenu.Nav.WarpHistoryPage']}</span>
          </div>
        </Link>
      </div>
      <div className={styles.NavContainer}>
        <Link to={`/${LangKey}/banners-history`}>
          <div className={styles.NavOption}>
            <img className={styles.NavIcon} src={BannersHistoryIcon} alt='Banners history icon' />
            <span className={styles.NavText}>{Lang['Sidemenu.Nav.BannersHistoryPage']}</span>
          </div>
        </Link>
      </div>
      <div className={styles.NavContainer}>
        <Link to={`/${LangKey}/characters`}>
          <div className={styles.NavOption}>
            <img className={styles.NavIcon} src={CharactersIcon} alt='Characters icon' />
            <span className={styles.NavText}>{Lang['Sidemenu.Nav.CharactersPage']}</span>
          </div>
        </Link>
      </div>
      <div className={styles.NavContainer}>
        <Link to={`/${LangKey}/light-cones`}>
          <div className={styles.NavOption}>
            <img className={styles.NavIcon} src={LightConesIcon} alt='Light cones icon' />
            <span className={styles.NavText}>{Lang['Sidemenu.Nav.LightConesPage']}</span>
          </div>
        </Link>
      </div>
      <div className={styles.NavContainer}>
        <Link to={`/${LangKey}/relics`}>
          <div className={styles.NavOption}>
            <img className={styles.NavIcon} src={RelicIcon} alt='Relics icon' />
            <span className={styles.NavText}>{Lang['Sidemenu.Nav.RelicsPage']}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}