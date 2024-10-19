import api from '@/services/api';
import { AxiosError } from 'axios';
import { v4 as uuid } from 'uuid';

export class FormattedError {

  public error: any;
  public description: string;

  constructor(props: FormattedError) {
    this.error = props.error;
    this.description = props.description;
  }

}

const LOCAL_UUID_STORE_KEY = 'LOCAL_UUID';

interface HandleErrorProps {
  error: any;
  sendLog?: boolean;
}
export default async function HandleError({
  error,
  sendLog=true
}: HandleErrorProps) {

  const localUUID = handleLocalUUID();

  const additionalInfo = [
    `location: ${window.location.href}`
  ].join('\n');

  console.log('');
  if(error instanceof FormattedError) {

    console.error(`[FORMATTED ERROR]`);
    console.log('[DESCRIPTION]');
    console.log(error.description);
    console.log('[ERROR]');
    console.log(error.error);

    const stringError = stringifyError({ error: error.error });
    const errorParsed = stringError ?stringError :`${error.error}`;

    if(sendLog)
      await submitLog({
        id: localUUID,
        type: 'FORMATTED ERROR',
        message: error.description,
        error: errorParsed,
        additional: additionalInfo
      });

  } else if(error instanceof AxiosError) {

    console.error('[AXIOS ERROR]');
    console.log('[MESSAGE]');
    console.log(error.message);
    console.log('[ERROR]');
    console.log(error);

    const stringError = stringifyError({ error });
    const errorParsed = stringError
      ? stringError
      : error.config
        ? `${error.name}: ${error.config.baseURL}${error.config.url}`
        : error.stack
          ? `${error.stack}`
          : `${error}`;

    if(sendLog)
      await submitLog({
        id: localUUID,
        type: 'AXIOS ERROR',
        message: error.message,
        error: errorParsed,
        additional: additionalInfo
      });

  } else if (error instanceof Error) {

    console.error('[INSTANCE ERROR]');
    console.log('[MESSAGE]');
    console.log(error.message);
    console.log('[ERROR]');
    console.log(error);

    const stringError = stringifyError({ error });
    const errorParsed = stringError
      ? stringError
      : typeof error==='object' && error.stack
        ? `${error.stack}`
        : `${error}`;

    if(sendLog)
      await submitLog({
        id: localUUID,
        type: 'INSTANCE ERROR',
        message: error.message,
        error: errorParsed,
        additional: additionalInfo
      });

  } else {

    console.error('[ANY ERROR]');
    console.log('[ERROR]');
    console.log(error);

    const stringError = stringifyError({ error });
    const errorParsed = stringError ?stringError :`${error}`;

    if(sendLog)
      await submitLog({
        id: localUUID,
        type: 'ANY ERROR',
        message: 'any error',
        error: errorParsed,
        additional: additionalInfo
      });

  }

}

export function handleLocalUUID() {
  const stored = localStorage.getItem(LOCAL_UUID_STORE_KEY);
  if(stored) return stored;

  const localUUID = uuid();
  localStorage.setItem(LOCAL_UUID_STORE_KEY, localUUID);
  return localUUID;
}

interface StringifyErrorProps {
  error: any;
  indent?: number;
}
export function stringifyError({ error, indent }: StringifyErrorProps) {
  try {
    if(indent)
      return JSON.stringify(JSON.parse(error), null, indent);
    return JSON.stringify(JSON.parse(error));
  } catch {
    try {
      if(indent)
        return JSON.stringify(error, null, indent);
      return JSON.stringify(error);
    } catch {
      return undefined;
    }
  }
}

interface SendLogProps {
  id: string;
  type: string;
  message: string;
  error: string;
  additional: string;
}
async function submitLog({ id, type, message, error, additional }: SendLogProps) {
  try {
    const data = JSON.stringify({ id, type, message, error, additional });
    await api.post('/log', data);
  } catch(error) {
    console.error(error);
  }
}