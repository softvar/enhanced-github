import React from 'react';
import './style.css';
import Routes from './Routes';
import store from './store/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

export default function App(props) {
  
  return (
    <Provider store={store}>
      <Routes currentRepo={props.currentRepo} />
      <Toaster />
  </Provider>
  );
}
