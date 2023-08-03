// Правильный вариант
// bundle будет добавлять тогда только все необходимые файлы
export * from './PizzaBlock/Skeleton';
export * from './PizzaBlock/PizzaBlock';
export * from './Header';
export * from './Categories';
export * from './CartItem';
export * from './CartEmpty';
export * from './Search/Search';
export * from './Pagination/Pagination';
export * from './NotFoundBlock/NotFoundBlock';
export * from './Sort';

// Не совсем правильный вариант
/*
import Skeleton from './PizzaBlock/Skeleton';
import PizzaBlock from './PizzaBlock/PizzaBlock';
import Header from './Header';
import Categories from './Categories';
import CartItemBlock from './CartItem';
import CartEmpty from './CartEmpty';
import Search from './Search/Search';
import Pagination from './Pagination/Pagination';
import NotFoundBlock from './NotFoundBlock/NotFoundBlock';
import Sort from './Sort';

export {
  Skeleton,
  PizzaBlock,
  Header,
  Categories,
  CartItemBlock,
  CartEmpty,
  Search,
  Pagination,
  NotFoundBlock,
  Sort,
};
*/
