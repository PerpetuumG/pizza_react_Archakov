import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <div className={'cart cart--empty'}>
      <h2>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p>
        Вероятней всего вы не заказывали еще пиццу <br />
        Для того, чтобы заказать пиццу, перейдите на главную страницу.
      </p>
      <img src={cartEmptyImg} alt="empty-cart" />
      <Link to={'/'} className={'button button--black'}>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};