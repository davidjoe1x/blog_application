
import React from 'react';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useContext } from 'react';
import { Context } from './components/context/Context';
import Navbar from './components/navbar/Navbar';


import {
  BrowserRouter as Router,
  Route, Routes, Link
} from "react-router-dom";




function App() {
  const { user } = useContext(Context);
  return (
    <Router>
  
  <Navbar/>
    
      <Routes>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/register' exact element={user ? <Home /> : <Register />}></Route>
        <Route path='/login' exact element={user ? <Home /> : <Login />}></Route>
        <Route path='/write' exact element={user ? <Write /> : <Register />}></Route>
        <Route path='/post/:postId' exact element={<Single />}></Route>
        <Route path='/settings' exact element={user ? <Settings /> : <Register />}></Route>
      </Routes>
    </Router>




  );
}

export default App;
