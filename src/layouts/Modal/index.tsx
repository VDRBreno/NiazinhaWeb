import { FiX } from 'react-icons/fi';

import Button from '@/components/Button';
import useLang from '@/hooks/useLang';

import styles from './styles.module.scss';

interface ModalProps {
  content: JSX.Element;
  closeModal: () => void;
}

export default function Modal({
  content,
  closeModal
}: ModalProps) {

  const { Lang } = useLang();

  return (
    <div id={styles.Container}>
      <div className={styles.ModalContent}>
        <div className={styles.Header}>
          <Button onClick={closeModal} props={{ style: { backgroundColor: '#4C0084' }, "aria-label": Lang['Modal.Button.CloseModal.AriaLabel'] }}>
            <FiX size={20} color='#FFFFFF' />
          </Button>
        </div>
        <div className={styles.Content}>
          {content}
        </div>
      </div>
    </div>
  );
}