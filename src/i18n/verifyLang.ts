import HandleError, { FormattedError } from '@/utils/HandleError';
import colorout from '@/utils/colorout';

import { DefaultLang, ILangKeys, ILangType } from '.';

type ILangKeysWithNullable = {
  [key in ILangKeys]?: Record<string, string>;
}

export default function verifyLang(data: ILangKeysWithNullable) {

  const key = Object.keys(data)[0];
  const lang = Object.values(data)[0];

  try {

    const langFixed = fixLang(lang);
    console.log(`[${colorout.fg.cyan}CHECK${colorout.reset}] Lang ( ${key} ) `);
    return langFixed;

  } catch(error) {
    HandleError({
      error: new FormattedError({ error, description: `Unable to Verifylang.${key}` }),
    });
    return DefaultLang;
  }

}

export function fixLang(lang: Record<string, string>) {

  let langFixed: Record<string, string> = {};

  const DefaultLangKeys = Object.keys(DefaultLang) as (keyof typeof DefaultLang)[];

  for(const key of DefaultLangKeys) {
    if(!lang[key]) {
      langFixed[key] = DefaultLang[key];
    } else {
      langFixed[key] = lang[key];
    }
  }

  return { ...langFixed } as ILangType;

}