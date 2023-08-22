import { useState,useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css'
import CreateUser from './pages/CreateUser/CreateUser';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Data from './pages/Data/Data';
import NewPassword from './pages/ForgotPassword/NewPassword';
import Home2 from './pages/Home2';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const loggedINN = localStorage.getItem('loggedIn');


  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
    <ResponsiveAppBar setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      <Routes>
        <Route path='/Datos' element={<Data/>}></Route>
        <Route path='/Iniciar Sesión' element={<Login setLoggedIn={setLoggedIn}/>}></Route>
        <Route path='/registrarte' loggedIn={loggedIn} setLoggedIn={setLoggedIn} element={<CreateUser/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home2/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Routes>
    </>
     
    
  )
}

export default App
