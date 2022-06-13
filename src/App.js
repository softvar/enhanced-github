import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Auth from './Components/Auth';
import Create from './Components/Create';
import ApiKey from './Components/ApiKey';
import Transfer from './Components/Transfer';
import Success from './Components/Success';
import Nav from './Components/Nav';
import Account from './Components/Account';
import Onboard from './Components/Onboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route exact path="/popup.html" element={<Auth />} />
          <Route exact path="/home" element={<Account />} />
          <Route exact path="/onboard" element={<Onboard />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/apikey" element={<ApiKey />} />
          <Route exact path="/transfer" element={<Transfer />} />
          <Route exact path="/success" element={<Success />} />
        </Routes>
        <Nav />
      </div>
    </BrowserRouter>
  );
}
