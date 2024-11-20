import { FiEdit, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import useLang from '@/hooks/useLang';
import useModal from '@/hooks/useModal';
import { IFavoriteProfile } from '@/types/FavoriteProfile';
import { MihomoResourceURL } from '@/types/MihomoResource';
import Button from '@/components/Button';
import ModalEditFavoriteProfile from '@/components/ModalContents/ModalEditFavoriteProfile';

import styles from './styles.module.scss';

interface FavoriteProfileProps {
  favoriteProfile: IFavoriteProfile;
}

export default function FavoriteProfile({
  favoriteProfile
}: FavoriteProfileProps) {

  const { Lang, LangKey } = useLang();
  const { openModal } = useModal();

  return (
    <div id={styles.Container}>
      <div className={styles.EditButtonContainer}>
        <Button
          onClick={() => openModal({ element: <ModalEditFavoriteProfile profile={favoriteProfile} /> })}
          props={{ style: { height: 'auto', padding: '10px' } }}  
        >
          <FiEdit size={15} color='#FFFFFF' />
        </Button>
      </div>
      <Link to={`/${LangKey}/user/${favoriteProfile.uid}`} aria-label={Lang['FavoriteProfile.Link.NavigateToUserPage.AriaLabel']}>
        <img className={styles.Avatar} src={MihomoResourceURL+favoriteProfile.avatar} alt='Profile avatar' />
        <div className={styles.InfoContainer}>
          <span className={styles.UID}>{favoriteProfile.uid}</span>
          <span className={styles.Name}>{favoriteProfile.name}</span>
          {favoriteProfile.nickname!=='' ? (
            <div className={styles.InLine}>
              <FiEdit2 size={12} color='#8F75A7' />
              <span className={styles.Nickname}>{favoriteProfile.nickname}</span>
            </div>
          ) :null}
        </div>
      </Link>
    </div>
  );
}