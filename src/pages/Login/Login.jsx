import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import swal from 'sweetalert';
import './Login.css'
import jwtDecode from 'jwt-decode';

const SignupSchema = Yup.object().shape({
  correo: Yup.string().email('Correo inválido').required('Campo obligatorio').max(100),
  contrasenia: Yup.string().required('Campo obligatorio').max(100),
});


const Login = ({ setLoggedIn }) => { 
  const [captcha, setCaptcha]= useState(null)
  const recaptchaRef = useRef(null)
  const navigate = useNavigate();

  const onChange = () =>{
    console.log('elusuario no es un robot')
  }
  
  const handleSubmit = async (values) => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      alert('Por favor, complete el reCAPTCHA.');
      return;
    }
    try {
      const response = await axios.post('http://pruebaxkape1.com.devel/api/plataforma/login', values)
      console.log("token", response.data.data.data.token)

      if(response.status == 200){
        setLoggedIn(true);
        const token = response.data.data.data.token;
        localStorage.setItem('authToken', JSON.stringify({ token, idSesion: response.data.data.data.idSesion }));
        swal("Bienvenido"  , response.data.data.data.user.primer_nombre, "success");
        navigate('/home', { state: { replace: true } });
        
        localStorage.setItem('user', JSON.stringify(response.data.data.data.user));
        localStorage.setItem('loggedIn', true);
      
      }
    } catch (error) {
      swal("Usuario o Contraseña invalidos"  , "intenta nuevamente ", "error");

    }
  
    // ... Realizar la solicitud al servidor aquí ...
  };

  return (
    <div className='containerLogin'>
     
      
      <Formik
        initialValues={{
         
          correo: '',
          contrasenia: '',
          keepSesion: false
          
          
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form className='container'>
            <h1>Iniciar Sesion</h1>
           
              
              <Grid item xs={6} > {/* Segunda columna */}
    
              </Grid>
            
            <div>
                  <TextField
                    label="Correo"
                    name="correo"
                    type="correo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.correo && touched.correo)}
                    helperText={(errors.correo && touched.correo) && errors.correo}
                    value={values.correo}
                    onChange={handleChange}
                    inputProps={{ maxLength: 100 }}
                    autoComplete="off"
                    className="large-input"
                  />
                </div>
                    
                <div>
                  <TextField
                    label="Contraseña"
                    name="contrasenia"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.contrasenia && touched.contrasenia)}
                    helperText={(errors.contrasenia && touched.contrasenia) && errors.contrasenia}
                    value={values.contrasenia}
                    onChange={handleChange}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>
                <a href='/forgot-password' >¿Olvidaste tu contraseña?</a>
             

                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="keepSesion"
                        
                        checked={values.keepSesion}
                        onChange={handleChange}
                      />
                    }
                    label="Mantener sesión iniciada"
                  />
                 
                </div>
                <div className='recap'>
                  <ReCAPTCHA sitekey='6LeTDagnAAAAAIoVwYCKw3YJmAZgT6xxel9L9gIF' ref={recaptchaRef} onChange={onChange} />
                </div>
                {/* Botón de registro */}
                <button  className='button1'type="submit" >
                  Iniciar Sesion
                </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
