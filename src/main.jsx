//main.jsx
import React from 'react'
import { Provider } from 'react-redux'
import store from './store.js'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
