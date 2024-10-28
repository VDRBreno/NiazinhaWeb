import Header from '@/layouts/Header';
import useLang from '@/hooks/useLang';

import styles from './styles.module.scss';

export default function Home() {

  const { Lang, LangKey } = useLang();

  return (
    <div id={styles.Container}>
      Home: {LangKey} | {Lang['Home.Title']}
      <Header />
    </div>
  );
}