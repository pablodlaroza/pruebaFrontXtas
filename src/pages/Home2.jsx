import React, { useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';

function Home2() {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
//   console.log(user);

  const authToken = localStorage.getItem('authToken');
  const jsonToken = authToken ? JSON.parse(authToken): null;
//   console.log(jsonToken.token)
//   console.log(authToken)
  const decodedToken = jwtDecode(authToken);
//   console.log(decodedToken.id_sesion);
  const id = user.id;
//   console.log(id);

  const headers = {
    Authorization: `Bearer ${jsonToken.token}`,
  };
  

  const consultUserById = async (id, decodedToken) => {
    try {
        const response = await axios.get(
        `http://pruebaxkape1.com.devel/api/plataforma/usuario/${id}/sesion/${decodedToken.id_sesion}`,
        { headers: headers } // Pasamos el objeto headers aquí
      );
         console.log(response.data.data)
         const userInfo = response.data.data
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  useEffect(() => {
    if (user && decodedToken) {
      consultUserById(user.id, decodedToken);
    }
  }, [user, decodedToken]);
  
  return (
    <div id='home'>
    
     <h1>HOME</h1>
    </div>
  );
}

export default Home2;
