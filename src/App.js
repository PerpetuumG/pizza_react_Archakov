import { useEffect, useState } from 'react';
import axios from 'axios';

import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';

import './scss/app.scss';

// импорт данных из файла src/assets/pizzas.json
// import pizzas from './assets/pizzas.json';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get('https://64aea1a3c85640541d4d6f3a.mockapi.io/items');
        setItems(itemsResponse.data);
      } catch (e) {
        alert('Ошибка при запросе данных :(');
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map(obj => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
