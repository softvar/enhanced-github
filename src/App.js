import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Auth from './Components/Auth';
import Create from './Components/Create';
import ApiKey from './Components/ApiKey';
import Transfer from './Components/Transfer';
export default function App() {
  console.log();
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/popup.html" element={<Home />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/apikey" element={<ApiKey />} />
          <Route exact path="/transfer" element={<Transfer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
