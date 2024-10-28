import en from './data/en.json';
import verifyLang from './verifyLang';

export const DefaultLangKey = 'en';
export const DefaultLang = en;

export const LANG_STORE_KEY = 'LANG';

export type ILangType = typeof DefaultLang;
export type ILangKeys = 'en' | 'cht' | 'cn' | 'es' | 'fr' | 'id' | 'jp' | 'kr' | 'pt' | 'ru' | 'th' | 'vi';
export const LangKeys: { key: ILangKeys; label: string; }[] = [
  { key: 'en', label: 'English' },
  { key: 'pt', label: 'Português' }
];

export const LangChoices = LangKeys.map(item => item.key);

class LangsManager {
  constructor() {
    const storedLangKey = localStorage.getItem(LANG_STORE_KEY);
    if(!storedLangKey || storedLangKey!==getLangKey(storedLangKey)) {
      localStorage.setItem(LANG_STORE_KEY, DefaultLangKey);
    }
  }

  async getLang(langKey: ILangKeys): Promise<ILangType> {
    switch(langKey) {
      case 'en':
        return en;
      case 'pt':
        return verifyLang({ pt: (await import('./data/pt.json')).default });
      default:
        return en;
    }
  }
}

export const Langs = new LangsManager();

export async function getLang(lang: ILangKeys): Promise<ILangType> {
  return await Langs.getLang(lang);
}
export function getLangKey(lang: string | undefined | null): ILangKeys {
  if(!lang)
    return DefaultLangKey;

  if(isValidLangKey(lang))
    return lang;

  return DefaultLangKey;
}
export function isValidLangKey(langKey: string): langKey is ILangKeys {
  return LangChoices.includes(langKey as ILangKeys);
}
export function formaLangKey(langKey: ILangKeys) {
  // Following ISO 639-1 ( https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes )

  if(langKey==='cht' || langKey==='cn')
    return 'zh';
  if(langKey==='kr')
    return 'ko';
  if(langKey==='jp')
    return 'ja';
  return langKey;
}