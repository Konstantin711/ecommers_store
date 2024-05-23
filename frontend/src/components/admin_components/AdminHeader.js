import React from 'react';
import '../../styles/admin_header.css';  


const AdminHeader = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Магазин Адмінка</h1>
        </div>
        <div className="user-info">
          <span>Привіт, Адмін</span>
          <button>Вийти</button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
