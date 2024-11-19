import { AxiosError } from 'axios';

import { FormattedError, stringifyError } from '@/utils/HandleError';
import useLang from '@/hooks/useLang';
import Button from '@/components/Button';
import DiscordLogo from '@/assets/svg/discord_logo.svg';

import styles from './styles.module.scss';

interface ErrorProps {
  error: any;
}

export default function ErrorScreen({
  error
}: ErrorProps) {

  const { Lang, LangKey } = useLang();

  const displayError = getDisplayError();

  function getDisplayError() {
    if(error instanceof FormattedError) {

      const stringError = stringifyError({ error: error.error });
      const errorParsed = stringError ?stringError :`${error.error}`;

      return {
        error: errorParsed,
        message: error.description
      };

    } else if(error instanceof AxiosError) {
  
      const stringError = stringifyError({ error });
      const errorParsed = stringError
        ? stringError
        : error.config
          ? `${error.name}: ${error.config.baseURL}${error.config.url}`
          : error.stack
            ? `${error.stack}`
            : `${error}`;

      return {
        error: errorParsed,
        message: error.message
      };
  
    } else if (error instanceof Error) {
  
      const stringError = stringifyError({ error });
      const errorParsed = stringError
        ? stringError
        : typeof error==='object' && error.stack
          ? `${error.stack}`
          : `${error}`;

      return {
        error: errorParsed,
        message: error.message
      };
  
    } else {
  
      const stringError = stringifyError({ error });
      const errorParsed = stringError ?stringError :`${error}`;

      return {
        error: errorParsed,
        message: 'Unknown error'
      };
  
    }
  }

  return (
    <div id={styles.Container}>
      <span className={styles.Title}>{Lang['ErrorScreen.Title']}</span>
      <a href={`/${LangKey}/discord`} target='_blank' aria-label={Lang['ErrorScreen.Link.NavigateToDiscordPage.AriaLabel']}>
        <Button props={{ style: { gap: '7px', backgroundColor: '#5865F2' } }}>
          <img src={DiscordLogo} alt='Discord logo' width={23} />
          <span style={{ fontWeight: '700' }}>Discord</span>
        </Button>
      </a>
      <div className={styles.ErrorContainer}>
        <span className={styles.ErrorTitle}>{Lang['ErrorScreen.MessageTitle']}</span>
        <span className={styles.ErrorDescription}>{displayError.message}</span>
      </div>
      <div className={styles.ErrorContainer}>
        <span className={styles.ErrorTitle}>{Lang['ErrorScreen.ErrorTitle']}</span>
        <span className={styles.ErrorDescription}>{displayError.error}</span>
      </div>
    </div>
  );
}