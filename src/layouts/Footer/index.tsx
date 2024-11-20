import { Link } from 'react-router-dom';

import useLang from '@/hooks/useLang';
import NiazinhaFooterLogo from '@/assets/svg/niazinha_footer_logo.svg';
import GithubLogo from '@/assets/svg/github_logo.svg';
import DiscordLogo from '@/assets/svg/discord_logo.svg';

import styles from './styles.module.scss';

export default function Footer() {

  const { Lang, LangKey } = useLang();

  return (
    <div id={styles.Container}>
      <div className={styles.Content}>
        <img className={styles.Logo} src={NiazinhaFooterLogo} alt='Niazinha dark logo' />
        <div className={`${styles.Row} ${styles.RowBreak}`}>
          <div className={styles.Column} style={{ maxWidth: '650px' }}>
            <span className={styles.TextDescriber}>{Lang['Footer.NoRelations']}</span>
            <Link to={`/${LangKey}/privacy-policy`} aria-label={Lang['Footer.Link.NavigateToPrivacyPolicyPage.AriaLabel']}>
              <span className={styles.TextPrivacy}>{Lang['Footer.Privacy']}</span>
            </Link>
          </div>
          <div className={styles.Row}>
            <div className={styles.Column} style={{ gap: '10px' }}>
              <span className={styles.TextTabTitle}>{Lang['Footer.Links']}</span>
              <Link to={`/${LangKey}/characters`} aria-label={Lang['SideMenu.Link.NavigateToCharactersPage.AriaLabel']}>
                <span className={styles.TextTabLink}>{Lang['SideMenu.Nav.CharactersPage']}</span>
              </Link>
              <Link to={`/${LangKey}/relics`} aria-label={Lang['SideMenu.Link.NavigateToRelicsPage.AriaLabel']}>
                <span className={styles.TextTabLink}>{Lang['SideMenu.Nav.RelicsPage']}</span>
              </Link>
              <Link to={`/${LangKey}/light-cones`} aria-label={Lang['SideMenu.Link.NavigateToLightConesPage.AriaLabel']}>
                <span className={styles.TextTabLink}>{Lang['SideMenu.Nav.RelicsPage']}</span>
              </Link>
              <Link to={`/${LangKey}/warp`} aria-label={Lang['SideMenu.Link.NavigateToWarpPage.AriaLabel']}>
                <span className={styles.TextTabLink}>{Lang['SideMenu.Nav.WarpHistoryPage']}</span>
              </Link>
              <Link to={`/${LangKey}/banners-history`} aria-label={Lang['SideMenu.Link.NavigateToBannersHistoryPage.AriaLabel']}>
                <span className={styles.TextTabLink}>{Lang['SideMenu.Nav.BannersHistoryPage']}</span>
              </Link>
              <Link to={`/${LangKey}/cards`} aria-label={Lang['Footer.Link.NavigateToModelBuildCards.AriaLabel']}>
                <span className={styles.TextTabLink}>{Lang['Footer.ModelBuildCards']}</span>
              </Link>
            </div>
            <div className={styles.Column}>
              <a href='https://github.com/VDRBreno/NiazinhaWeb' target='_blank'>
                <span className={styles.TextExternalLink}>
                  <img src={GithubLogo} style={{ width: '22px' }} alt='Github logo' />
                  VDRBreno
                </span>
              </a>
              <Link to={`/${LangKey}/discord`} target='_blank'>
                <span className={styles.TextExternalLink}>
                  <img src={DiscordLogo} style={{ width: '22px' }} alt='Discord logo' />
                  Discord
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}