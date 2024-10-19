import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/styles/global.scss';
import { toastOptions } from '@/styles/toastify';

import Router from './router';

function App() {
  return (
    <>
      <ToastContainer {...toastOptions} />
      <Router />
    </>
  );
}

export default App;