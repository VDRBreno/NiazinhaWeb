import { useContext } from 'react';

import { LangContext } from '@/contexts/LangContext';

export default function useLang() {
  const value = useContext(LangContext);
  return value;
}