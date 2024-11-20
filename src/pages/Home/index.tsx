import { useState } from 'react';

import { Link } from 'react-router-dom';
import { FiCheck, FiExternalLink, FiStar } from 'react-icons/fi';

import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import useLang from '@/hooks/useLang';
import useUserData from '@/hooks/useUserData';
import Input from '@/components/Input';
import Button from '@/components/Button';
import FavoriteProfile from '@/components/FavoriteProfile';

import HomeBuildCardsPreviewBackground from '@/assets/img/HomeBuildCardsPreviewBackground.webp';
import HomeBuildCardPreview from '@/assets/img/HomeBuildCardPreview.webp';
import WarpIcon from '@/assets/svg/warp_icon.svg';
import HomePagePreviewWarp from '@/assets/img/HomePagePreview-Warp.webp';
import CharactersIcon from '@/assets/svg/characters_icon.svg';
import HomePagePreviewCharacters from '@/assets/img/HomePagePreview-Warp.webp';
import LightConeIcon from '@/assets/svg/light_cone_icon.svg'
import HomePagePreviewLightCones from '@/assets/img/HomePagePreview-LightCones.webp';
import RelicIcon from '@/assets/svg/relic_icon.svg';
import HomePagePreviewRelics from '@/assets/img/HomePagePreview-Relics.webp';
import BannersHistoryIcon from '@/assets/svg/banners_history_icon.svg';
import HomePagePreviewBannersHistory from '@/assets/img/HomePagePreview-BannersHistory.webp';

import styles from './styles.module.scss';

export default function Home() {

  const { Lang, LangKey } = useLang();
  const { getLastUIDSearched, getFavoritesProfiles } = useUserData();
  const lastUIDSearched = getLastUIDSearched();
  const favoritesProfiles = getFavoritesProfiles();

  const [UID, setUID] = useState('');

  function navigateToUserPage(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

  }

  return (
    <div id={styles.Container}>
      <Header />
      <div className={styles.Main}>
        <div className={styles.BuildCardsContainer}>
          <img className={styles.BuildCardsBackgroundImage} src={HomeBuildCardsPreviewBackground} alt='Background image - build cards preview' />
          <img className={styles.BuildCardPreview} src={HomeBuildCardPreview} alt='Build card preview' />
          <div className={styles.BuildCardsDetails}>
            <div className={styles.InColumn}>
              <span className={styles.Title}>{Lang['Home.BuildCard.Title']}</span>
              <Link to={`/${LangKey}/cards`}>
                <div className={styles.InLine} style={{ gap: '3px' }}>
                  <span className={styles.CardsLink}>{Lang['Home.BuildCard.CardsDesignLink']}</span>
                  <FiExternalLink size={14} color='#5865F2' />
                </div>
              </Link>
            </div>
            <div className={styles.InColumn}>
              <form onSubmit={navigateToUserPage}>
                <div className={styles.InLine}>
                  <Input
                    value={UID}
                    onChange={setUID}
                    props={{
                      placeholder: 'UID'
                    }}
                    containerStyle={{ border: '2px solid #4D0186', backgroundColor: '#12011F' }}
                  />
                  <Button onClick={navigateToUserPage} props={{ "aria-label": 'Navigate to user page' }}>
                    <FiCheck size={20} color='#FFFFFF' />
                  </Button>
                </div>
              </form>
              {lastUIDSearched ? (
                <Link to={`/${LangKey}/user/${lastUIDSearched}`}>
                  <div className={styles.LastUID}>
                    {lastUIDSearched}
                    <FiExternalLink size={12} color='#8F75A7' />
                  </div>
                </Link>
              ) :null}
            </div>
          </div>
        </div>

        {favoritesProfiles.length>0 ? (
          <div className={styles.FavoritesProfilesContainer}>
            <div className={styles.InLine} style={{ gap: '5px' }}>
              <FiStar size={25} color='#CAAC10' />
              <span className={styles.FavoritesTitle}>{Lang['Home.FavoritesProfiles.Title']}</span>
            </div>
            <div className={styles.FavoritesProfiles}>
              {favoritesProfiles.map(profile => (
                <FavoriteProfile key={profile.uid} favoriteProfile={profile} />
              ))}
            </div>
          </div>
        ) :null}

        <div className={styles.PreviewPagesContainer}>
          <div className={styles.PreviewPagesLine}>
            <Link className={styles.PreviewPage} to={`/${LangKey}/warp`} aria-label={Lang['SideMenu.Link.NavigateToWarpPage.AriaLabel']}>
              <span className={styles.PreviewPageTitle}>
                <img className={styles.PreviewPageIcon} src={WarpIcon} alt='Warp history page icon' />
                {Lang['SideMenu.Nav.WarpHistoryPage']}
              </span>
              <img className={styles.PreviewPageImage} src={HomePagePreviewWarp} alt='Warp history page preview image' />
            </Link>
            <Link className={styles.PreviewPage} to={`/${LangKey}/characters`} aria-label={Lang['SideMenu.Link.NavigateToCharactersPage.AriaLabel']}>
              <span className={styles.PreviewPageTitle}>
                <img className={styles.PreviewPageIcon} src={CharactersIcon} alt='Characters page icon' />
                {Lang['SideMenu.Nav.CharactersPage']}
              </span>
              <img className={styles.PreviewPageImage} src={HomePagePreviewCharacters} alt='Characters page preview image' />
            </Link>
          </div>
          <div className={styles.PreviewPagesLine}>
            <Link className={styles.PreviewPage} to={`/${LangKey}/light-cones`} aria-label={Lang['SideMenu.Link.NavigateToLightConesPage.AriaLabel']}>
              <span className={styles.PreviewPageTitle}>
                <img className={styles.PreviewPageIcon} src={LightConeIcon} alt='Light cone page icon' />
                {Lang['SideMenu.Nav.LightConesPage']}
              </span>
              <img className={styles.PreviewPageImage} src={HomePagePreviewLightCones} alt='Light cones page preview image' />
            </Link>
            <Link className={styles.PreviewPage} to={`/${LangKey}/relics`} aria-label={Lang['SideMenu.Link.NavigateToRelicsPage.AriaLabel']}>
              <span className={styles.PreviewPageTitle}>
                <img className={styles.PreviewPageIcon} src={RelicIcon} alt='Relics page icon' />
                {Lang['SideMenu.Nav.RelicsPage']}
              </span>
              <img className={styles.PreviewPageImage} src={HomePagePreviewRelics} alt='Relics page preview image' />
            </Link>
          </div>
          <div className={styles.PreviewPagesLine}>
            <Link className={styles.PreviewPage} to={`/${LangKey}/banners-history`} aria-label={Lang['SideMenu.Link.NavigateToBannersHistoryPage.AriaLabel']}>
              <span className={styles.PreviewPageTitle}>
                <img className={styles.PreviewPageIcon} src={BannersHistoryIcon} alt='Banners history icon' />
                {Lang['SideMenu.Nav.BannersHistoryPage']}
              </span>
              <img className={styles.PreviewPageImage} src={HomePagePreviewBannersHistory} alt='Banners history page preview image' />
            </Link>
          </div>
        </div>

        <div className={styles.QuestionsContainer}>
          <div className={styles.QuestionContainer}>
            <div className={styles.Question}><div className={styles.QuestionIcon}>?</div>{Lang['Home.QA.1.Question']}</div>
            <span className={styles.Answer}>{Lang['Home.QA.1.Answer']}</span>
          </div>
          <div className={styles.QuestionContainer}>
            <div className={styles.Question}><div className={styles.QuestionIcon}>?</div>{Lang['Home.QA.1.Question']}</div>
            <span className={styles.Answer}>{Lang['Home.QA.1.Answer']}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}