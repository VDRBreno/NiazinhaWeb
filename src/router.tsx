import { createElement, lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import useLang from '@/hooks/useLang';
import { LangChoices } from '@/i18n';
const Home = lazy(() => import('@/pages/Home'));

export default function Router() {
  const routes: { path: string; element: React.LazyExoticComponent<() => JSX.Element>; }[] = [
    { path: '/', element: Home }
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='*' element={<NotFound />} /> */}
        <Route path='/' element={<RootPath />} />
        {LangChoices.map(lang => (
          routes.map(route => (
            <Route key={`${lang}/${route.path}`} path={`${lang}/${route.path}`} element={<LazyPage component={route.element} />} />
          ))
        ))}
      </Routes>
    </BrowserRouter>
  );
}

function LazyPage({ component }: { component: React.LazyExoticComponent<() => JSX.Element>; }) {
  return (
    // <Suspense fallback={<LoadingScreen />}>
    <Suspense fallback={<div>loading screen..</div>}>
      {createElement(component)}
    </Suspense>
  );
}

function RootPath() {
  const { LangKey } = useLang();
  return <Navigate to={`/${LangKey}`} />;
}