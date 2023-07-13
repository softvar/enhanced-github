import React from 'react';
import './style.css';
import Routes from './Routes';
import store from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function App(props) {
  
  return (
    <Provider store={store}>
      <Routes currentRepo={props.currentRepo} />
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable={false}
pauseOnHover
theme="dark">
  Test test test
  </ToastContainer>    </Provider>
  );
}
