import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import './scss/app.scss';
import { MainLayout } from './layouts/MainLayout';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

// если вместо export default ... используется export const...
const FullPizza = lazy(() =>
  import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza').then(m => ({
    default: m.FullPizza,
  })),
);
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

// импорт данных из файла src/assets/pizzas.json при неработающей базе данных
// import pizzas from './assets/pizzas.json';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout />}>
        <Route path={''} element={<Home />} />
        <Route
          path={'cart'}
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path={'pizza/:id'}
          element={
            <Suspense fallback={<div>Идёт загрузка всех доступных пицц...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path={'*'}
          element={
            <Suspense fallback={<div>Идёт загрузка 404...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
