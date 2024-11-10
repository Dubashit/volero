import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const isAdminPage = window.location.pathname.includes('/admin');

document.documentElement.style.overflowY = isAdminPage ? 'hidden' : 'auto';
document.body.style.overflowY = isAdminPage ? 'hidden' : 'auto';

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);