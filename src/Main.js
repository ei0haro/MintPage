import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import UpdateColor from './pages/UpdateColor';

const Main = ({connectedAdress}) => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route path='/' element={<Home/>} />
      <Route path='/updatecolor' element={<UpdateColor connectedAdress={connectedAdress}/>} />
    </Routes>
  );
}

export default Main;