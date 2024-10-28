import { createContext, ReactNode, useEffect, useState } from 'react';

import { DefaultLang, DefaultLangKey, getLang, getLangKey, ILangKeys, ILangType, LANG_STORE_KEY } from '@/i18n';
import Loading from '@/layouts/Loading';

interface LangContextProps {
  Lang: ILangType;
  LangKey: ILangKeys;
  changeLang: (LangKey: ILangKeys) => Promise<string | undefined>;
  parseLocationURL: (path: string, newLangKey: ILangKeys) => string;
  parseCurrentLocationURL: (newLangKey: ILangKeys) => string;
}

interface LangProviderProps {
  children: ReactNode;
}

export const LangContext = createContext({} as LangContextProps);

export default function LangProvider({
  children
}: LangProviderProps) {
  
  const [LangKey, setLangKey] = useState<ILangKeys>(getLangKeyByPath());
  const [Lang, setLang] = useState<ILangType>(DefaultLang);
  const [firstLangLoading, setFirstLangLoading] = useState(true);

  function getLangKeyByPath() {
    const storedLangKey = localStorage.getItem(LANG_STORE_KEY);
    const path = window.location.pathname.split('/')[1];
    if(path) {
      const verifiedLangKeyByPath = getLangKey(path);
      if(path===verifiedLangKeyByPath) {
        if(storedLangKey!==verifiedLangKeyByPath) {
          storeLangKey(verifiedLangKeyByPath);
        }

        return verifiedLangKeyByPath;
      }
    }

    if(storedLangKey) {
      const verifiedLangKeyByStore = getLangKey(storedLangKey);
      if(storedLangKey===verifiedLangKeyByStore) {
        return verifiedLangKeyByStore;
      }
    }

    return DefaultLangKey;
  }

  function storeLangKey(langKey: ILangKeys) {
    localStorage.setItem(LANG_STORE_KEY, langKey);
  }

  async function changeLang(langKey: ILangKeys) {
    if(LangKey===langKey && langKey===DefaultLangKey) {
      setFirstLangLoading(false);
      return;
    }
    

    setLang(await getLang(langKey));
    if(langKey!==LangKey)
      setLangKey(langKey);

    const newURL = parseCurrentLocationURL(langKey);

    if(firstLangLoading)
      setFirstLangLoading(false);

    return newURL;
  }

  function parseLocationURL(path: string, newLangKey: string) {
    let splitted = path.split('/');
    splitted[1] = newLangKey;
    return splitted.join('/');
  }

  function parseCurrentLocationURL(newLangKey: string) {
    return parseLocationURL(window.location.pathname, newLangKey)+window.location.search;
  }

  useEffect(() => {
    changeLang(LangKey);
  }, []);

  return (
    <LangContext.Provider value={{
      Lang,
      LangKey,
      changeLang,
      parseLocationURL,
      parseCurrentLocationURL
    }}>
      {firstLangLoading ?<Loading message='Loading Lang..' /> :children}
    </LangContext.Provider>
  );
}