import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/styles/global.scss';
import { toastOptions } from '@/styles/toastify';
import LangProvider from '@/contexts/LangContext';

import Router from './router';

function App() {
  return (
    <>
      <ToastContainer {...toastOptions} />
      <LangProvider>
        <Router />
      </LangProvider>
    </>
  );
}

export default App;