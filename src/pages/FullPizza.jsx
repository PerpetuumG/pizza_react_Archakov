import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get('https://64aea1a3c85640541d4d6f3a.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    };
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className={'container'}>
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} €</h4>
    </div>
  );
};
