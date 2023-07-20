import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Pagination } from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);

  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = id => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    async function fetchData() {
      try {
        const itemsResponse = await axios.get(
          `https://64aea1a3c85640541d4d6f3a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        setItems(itemsResponse.data);
      } catch (e) {
        alert('Ошибка при запросе данных :(');
        console.error(e);
      }
      setIsLoading(false);
    }
    fetchData();

    // переместиться в начало страницы
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className={'container'}>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
