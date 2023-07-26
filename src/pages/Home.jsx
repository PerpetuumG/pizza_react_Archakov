import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Pagination } from '../components/Pagination/Pagination';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = idx => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = page => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy: sortBy,
        order: order,
        search: search,
        category: category,
        currentPage: currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  // Проверить, где ошибки в будущем
  // Если изменили параметры и был первый рендер, то в этом случае будет такая проверка
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : null,
        currentPage: currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;

    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  // Проверяем, есть ли данные для сортировки и категории в адресной строке при первом запуске
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    // переместиться в начало страницы
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className={'container'}>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className={'content__error-info'}>
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>К сожалению не удалось получить питcы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
