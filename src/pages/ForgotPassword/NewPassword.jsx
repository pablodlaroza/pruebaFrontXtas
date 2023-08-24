import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import swal from 'sweetalert';

const SignupSchema = Yup.object().shape({
  codigo_verificacion: Yup.string().required('Campo obligatorio').max(100),

    password: Yup.string().required('Campo obligatorio').max(100),
    nueva_contrasenia: Yup.string()
    .required('Campo obligatorio')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .max(100)
});


const NewPassword = ({ setLoggedIn }) => { 
  const [captcha, setCaptcha]= useState(null)
  const recaptchaRef = useRef(null)
  const navigate = useNavigate();

  const onChange = () =>{
    console.log('elusuario no es un robot')
  }
  
  const handleSubmit = async(values) => {
    try {
      const response = await axios.put('http://pruebaxkape1.com.devel/api/plataforma/cambiar-contrasenia' , values)
      console.log(response)
      // if(response.status == 200){
        swal("Contraseña actualizada", "" , "success");
        navigate('/Iniciar Sesión', { state: { replace: true } });

      // }
    } catch (error) {
      // console.log(error.response.status)
      if(error.response.status === 404){
        swal("Codigo invalido", "" , "error");
      } else if(error.response.status === 400){
        swal("Codigo expirado", "" , "error");
      }else{

        swal("Error al procesar la solicitud", "" , "error");
      }


    }
  
  };

  return (
    <div>
      <Formik
        initialValues={{
          codigo_verificacion: '',
            password: '',
            nueva_contrasenia: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form className='container'>
            <h1>Ingresa nueva contraseña</h1>
            <div>
                  <TextField
                    label="Codigo de verificación"
                    name="codigo_verificacion"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.codigo_verificacion && touched.codigo_verificacion)}
                    helperText={(errors.codigo_verificacion && touched.codigo_verificacion) && errors.codigo_verificacion}
                    value={values.codigo_verificacion}
                    onChange={handleChange}
                    inputProps={{ maxLength: 100 }}
                    autoComplete="off"
                    className="large-input"
                  />
                </div>
                    
                
            <div>
                  <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.password && touched.password)}
                    helperText={(errors.password && touched.password) && errors.password}
                    value={values.password}
                    onChange={handleChange}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>
                <div>
                  <TextField
                    label="Confirmar Contraseña"
                    name="nueva_contrasenia"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.nueva_contrasenia && touched.nueva_contrasenia)}
                    helperText={(errors.nueva_contrasenia && touched.nueva_contrasenia) && errors.nueva_contrasenia}
                    value={values.nueva_contrasenia}
                    onChange={handleChange}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>
                    
                
              
                {/* Botón de registro */}
                <button className='button2'  type="submit" >
                    Restablecer contraseña
                </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPassword;
