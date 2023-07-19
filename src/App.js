import { createContext, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';

import './scss/app.scss';

export const SearchContext = createContext();

// импорт данных из файла src/assets/pizzas.json при неработающей базе данных
// import pizzas from './assets/pizzas.json';

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path={'/'} element={<Home searchValue={searchValue} />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
