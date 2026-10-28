import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { instantlyLoadAll } from './utils/instantLoader';

// Eagerly pre-decode all images and buffer videos for 0ms transitions
instantlyLoadAll();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

