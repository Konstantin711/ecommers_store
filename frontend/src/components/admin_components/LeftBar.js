import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/left_bar.css';  


const LeftBar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">Головна</Link>
        </li>
        <li>
          Керування товарами
          <ul>
            <li>
              <Link to="/products/add">Додати товари</Link>
            </li>
            <li>
              <Link to="/products/edit">Редагувати товари</Link>
            </li>
            <li>
              <Link to="/products/delete">Видалити товари</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/orders">Замовлення</Link>
        </li>
        <li>
          <Link to="/users">Користувачі</Link>
        </li>
        <li>
          Налаштування
          <ul>
            <li>
              <Link to="/settings/profile">Профіль</Link>
            </li>
            <li>
              <Link to="/settings/security">Безпека</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default LeftBar;
