// App.js
import React from 'react';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Home from './Pages/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './styles.scss'


const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/">
        <Route index element={<Registration />}/>
        <Route path="/login" element={<Login />}/>
        <Route path='/home' element={<Home />}/>
    </Route>
   </Routes>
   </BrowserRouter>
  );
};

export default App;
