import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const AppComponent = (
  <App />
);

const appElement = document.getElementById('app');
if(appElement && appElement.hasChildNodes()) {

  for(const child of appElement.childNodes) {
    appElement.removeChild(child);
  }

  ReactDOM.createRoot(appElement).render(AppComponent);
  // ReactDOM.hydrateRoot(appElement, AppComponent);
  
} else if(appElement) {
  
  ReactDOM.createRoot(appElement).render(AppComponent);
  
}