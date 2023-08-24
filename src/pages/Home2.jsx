import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Loading from '../components/Loading';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Home2() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const authToken = localStorage.getItem('authToken');
  const jsonToken = authToken ? JSON.parse(authToken) : null;
  const decodedToken = jwtDecode(authToken);

  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState(null); // Estado para valores editados

  const headers = {
    Authorization: `Bearer ${jsonToken.token}`,
  };

  const consultUserById = async (id, decodedToken) => {
    try {
      const response = await axios.get(
        `http://pruebaxkape1.com.devel/api/plataforma/usuario/${id}/sesion/${decodedToken.id_sesion}`,
        { headers: headers }
      );

      const userInfo = response.data.data;
      setUserInfo(userInfo);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      setIsLoading(false);
      swal('Tu sesión ha expirado', 'Vuelve a iniciar sesion', 'info');
      navigate('/Iniciar Sesión', { state: { replace: true } });
    }
  };

  useEffect(() => {
    if (user && decodedToken) {
      consultUserById(user.id, decodedToken);
    }
  }, [user, decodedToken]);

  const handleEditClick = () => {
    setIsEditing(true);
    if (userInfo) {
      setEditedUserInfo({ ...userInfo }); // Copiar los valores de userInfo al estado de edición
    }
  };

  const handleSaveClick = async () => {
    try {
      // Realizar la solicitud para guardar los cambios en el servidor
      const response = await axios.put(
        `http://pruebaxkape1.com.devel/api/plataforma/actualizar`,
        editedUserInfo, // Usar el estado de editedUserInfo
        { headers: headers }
      );
      console.log(response)

      // Actualizar la información local con los cambios guardados
      setUserInfo(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedUserInfo((prevEditedUserInfo) => ({
      ...prevEditedUserInfo,
      [field]: value,
    }));
  };

  return (
    <div style={{ width: 300, margin: 'auto', marginTop: 10 }} id='home'>
      {isLoading ? (
        <Loading />
      ) : (
        userInfo && (
          <ul>
            <li>
              <strong>Correo:     </strong>    
              {isEditing ? (
                <input
                  type='text'
                  value={editedUserInfo.correo} // Usar editedUserInfo
                  onChange={(e) => handleInputChange('correo', e.target.value)}
                />
              ) : (
                <span>{userInfo.correo}</span>
              )}
            </li>
            <li>
              <strong>Nombre:</strong>
              {isEditing ? (
                <input
                  type='text'
                  value={editedUserInfo.primer_nombre} // Usar editedUserInfo
                  onChange={(e) => handleInputChange('primer_nombre', e.target.value)}
                />
              ) : (
                <span>{userInfo.primer_nombre}</span>
              )}
            </li>
            <li>
              <strong>Apellido:</strong>
              {isEditing ? (
                <input
                  type='text'
                  value={editedUserInfo.primer_apellido} // Usar editedUserInfo
                  onChange={(e) => handleInputChange('primer_apellido', e.target.value)}
                />
              ) : (
                <span>{userInfo.primer_apellido}</span>
              )}
            </li>
            
          </ul>
        )
      )}
      {isEditing ? (
        <button onClick={handleSaveClick}>Guardar</button>
      ) : (
        <button onClick={handleEditClick}>Editar</button>
      )}
    </div>
  );
}

export default Home2;
