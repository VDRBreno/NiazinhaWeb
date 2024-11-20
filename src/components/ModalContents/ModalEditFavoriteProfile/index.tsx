import { useState } from 'react';

import { toast } from 'react-toastify';
import { FiSave, FiTrash2 } from 'react-icons/fi';

import useLang from '@/hooks/useLang';
import useModal from '@/hooks/useModal';
import useUserData from '@/hooks/useUserData';
import { IFavoriteProfile } from '@/types/FavoriteProfile';
import { MihomoResourceURL } from '@/types/MihomoResource';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { toastStyle } from '@/styles/toastify';

import styles from './styles.module.scss';

interface ModalEditFavoriteProfileProps {
  profile: IFavoriteProfile;
}

export default function ModalEditFavoriteProfile({
  profile
}: ModalEditFavoriteProfileProps) {
  
  const { Lang } = useLang();
  const { closeModal } = useModal();
  const { updateFavoriteProfile, removeFavoriteProfile } = useUserData();

  const [nickname, setNickname] = useState(profile.nickname);
  
  function handleSetNickname(value: string) {
    if(value.trim().length>25) {
      toast.error(Lang['ModalContents.ModalEditFavoriteProfile.Toast.MaxNicknameLength'], toastStyle.error);
      return;
    }
    setNickname(value.trim());
  }

  function handleRemove() {
    removeFavoriteProfile(profile.uid);
    closeModal();
  }

  function handleUpdate() {
    updateFavoriteProfile({ ...profile, nickname: nickname });
    closeModal();
  }

  return (
    <div id={styles.Container}>
      <div className={styles.Profile}>
        <img className={styles.Avatar} src={MihomoResourceURL+profile.avatar} alt='Profile avatar' />
        <div className={styles.Info}>
          <span className={styles.UID}>{profile.uid}</span>
          <span className={styles.Name}>{profile.name}</span>
        </div>
      </div>

      <Input
        value={nickname}
        onChange={handleSetNickname}
        containerStyle={{ marginTop: '10px', borderColor: '#4C0084' }}
        props={{
          placeholder: Lang['ModalContents.ModalEditFavoriteProfile.Input.Nickname.Placeholder'],
          style: { fontSize: '1.2rem' }
        }}
      />

      <div className={styles.Buttons}>
        <Button
          onClick={handleRemove}
          props={{
            style: { backgroundColor: '#D93434', gap: '7px' },
            "aria-label": Lang['ModalContents.ModalEditFavoriteProfile.Button.RemoveFavoriteProfile.AriaLabel']
          }}
        >
          <FiTrash2 size={20} color='#FFFFFF' />
          {Lang['ModalContents.ModalEditFavoriteProfile.Button.RemoveFavoriteProfile']}
        </Button>

        <Button
          onClick={handleUpdate}
          props={{
            style: { backgroundColor: '#3A9C2C', gap: '7px' },
            "aria-label": Lang['ModalContents.ModalEditFavoriteProfile.Button.UpdateFavoriteProfile.AriaLabel']
          }}
        >
          <FiSave size={20} color='#FFFFFF' />
          {Lang['ModalContents.ModalEditFavoriteProfile.Button.UpdateFavoriteProfile']}
        </Button>
      </div>
    </div>
  );
}