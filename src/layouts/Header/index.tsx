import { useNavigate } from 'react-router-dom';

import useLang from '@/hooks/useLang';
import { ILangKeys } from '@/i18n';

export default function Header() {
  
  const { LangKey, changeLang } = useLang();
  const navigate = useNavigate();

  async function handle(e: React.ChangeEvent<HTMLSelectElement>) {
    const redirectURL = await changeLang(e.target.value as ILangKeys);
    if(redirectURL)
      navigate(redirectURL);
  }

  return (
    <div>
      <select onChange={handle} defaultValue={LangKey}>
        <option>en</option>
        <option>pt</option>
      </select>
    </div>
  );
}