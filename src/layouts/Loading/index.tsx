import LoadingIcon from '@/components/LoadingIcon';

import styles from './styles.module.scss';

interface LoadingProps {
  message: string;
};

export default function Loading({
  message
}: LoadingProps) {
  return (
    <div id={styles.Container}>
      <LoadingIcon />
      {message}
    </div>
  );
}