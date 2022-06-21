import React from 'react';
import './style.css';
import Routes from './Routes';
import store from './store/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
