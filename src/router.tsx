import { createElement, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));

export default function Router() {
  const routes: { path: string; element: React.LazyExoticComponent<() => JSX.Element>; }[] = [
    { path: '/', element: Home }
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='*' element={<NotFound />} /> */}
        {/* <Route path='/' element={<RoutePath />} /> */}
        {routes.map(route => (
          <Route key={`${route.path}`} path={`${route.path}`} element={<LazyPage component={route.element} />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

function LazyPage({ component }: { component: React.LazyExoticComponent<() => JSX.Element>; }) {
  return (
    // <Suspense fallback={<LoadingScreen />}>
    <Suspense fallback={<div>loading..</div>}>
      {createElement(component)}
    </Suspense>
  );
}

// function RootPath() {
//   const { LangKey } = useLang();
//   return <Navigate to={`/${LangKey}`} />;
// }