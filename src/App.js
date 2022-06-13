import React from 'react';
import './index.css';
import Routes from './Routes';
import store from './store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
