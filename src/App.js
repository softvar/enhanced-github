import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Auth from './Components/Auth';
import Create from './Components/Create';
import ApiKey from './Components/ApiKey';
import Transfer from './Components/Transfer';
import Footer from './Components/Footer';
import Success from './Components/Success';
import Fail from './Components/Fail';
export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route exact path="/popup.html" element={<Auth />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/apikey" element={<ApiKey />} />
          <Route exact path="/transfer" element={<Transfer />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/fail" element={<Fail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
