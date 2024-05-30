import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/top_header.css'
import './styles/footer.css'
import './styles/main_header.css'
import './styles/main_page.css'
import './styles/sidebar.css'
import './styles/single_item_page.css'
import './styles/slider.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
