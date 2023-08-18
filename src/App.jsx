import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css'
import CreateUser from './pages/CreateUser/CreateUser';
import Start from './pages/Start/Start';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const loggedINN = localStorage.getItem('loggedIn');


  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/start' element={<Start/>}></Route>
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>}></Route>
        <Route path='/register' element={<CreateUser/>}></Route>
        <Route path="/change-password" element={<ForgotPassword />} />

        {loggedINN && (

        <Route path='/' element={<ResponsiveAppBar setLoggedIn={setLoggedIn}/>}>
            <Route path='/home' element={<Home/>}></Route>
             
        </Route>
        )}
      </Routes>
    </BrowserRouter>
     
    
  )
}

export default App
