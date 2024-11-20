import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'react-error-boundary';

import '@/styles/global.scss';
import { toastOptions } from '@/styles/toastify';
import LangProvider from '@/contexts/LangContext';
import ModalProvider from '@/contexts/ModalContext';
import ErrorScreen from '@/layouts/Error';
import HandleError from '@/utils/HandleError';

import Router from './router';

function App() {
  return (
    <>
      <ToastContainer {...toastOptions} />
      <LangProvider>
        <ErrorBoundary FallbackComponent={props => <ErrorScreen error={props.error} />} onError={error => HandleError({ error })}>
          <ModalProvider>
            <Router />
          </ModalProvider>
        </ErrorBoundary>
      </LangProvider>
    </>
  );
}

export default App;