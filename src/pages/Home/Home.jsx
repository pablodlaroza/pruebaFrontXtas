import React, { useEffect } from 'react';
import './Home.css';
import logo from '../../assets/logo.png';
import axios from 'axios';
import swal from 'sweetalert';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';

function Home() {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  console.log(user);

  // const authToken = localStorage.getItem('authToken');
  // const decodedToken = jwtDecode(authToken);
  // console.log(decodedToken.id_sesion);
  // const id = user.id;
  // console.log(id);

  // const consultUserById = async (id, decodedToken) => {
  //   try {
  //     const response = await axios.get(
  //       `http://pruebaxkape1.com.devel/api/plataforma/usuario/${id}/sesion/${decodedToken.id_sesion}`
  //     );
  //   } catch (error) {
  //     console.error('Error al obtener datos del usuario:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (user && decodedToken) {
  //     consultUserById(user.id, decodedToken);
  //   }
  // }, [user, decodedToken]);
  
  return (
    <div id='home'>
      {user ? (
        <h1>Bienvenido {user.primer_nombre} {user.primer_apellido}</h1>
      ) : (
        <h1>Inicia Sesion o Regístrate</h1>
      )}
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default Home;
