import React, { useCallback } from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/store';
import { selectPizzaData } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asincActions';
import { SearchPizzaParams } from '../redux/pizza/types';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';

import { useSelector } from 'react-redux';

import qs from 'qs';

import { sortList } from '../components/Sort';

import { Skeleton, PizzaBlock, Categories, Pagination, Sort } from '../components';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef<boolean>(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
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
        currentPage: String(currentPage),
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
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find(obj => obj.sortProperty === params.sortBy);

      // dispatch(setFilters({ ...params, sort: sort ? sort : sortList[0] }));
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
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

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className={'container'}>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className={'content__error-info'}>
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
