import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import swal from 'sweetalert';

const SignupSchema = Yup.object().shape({
    password: Yup.string().required('Campo obligatorio').max(100),
    contrasenia: Yup.string()
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
      const response = await axios.post('http://pruebaxkape1.com.devel/api/plataforma/resetear-contrasenia' , values)
      if(response.status == 200){
        swal("Correo con codigo enviado", response.data.data.correo , "success");
      }
    } catch (error) {
      swal("Correo no registrado", "", "error");
    }
    
  
    
    // const id = response.
    // const id = data.find((user) => user.username === values.username);

  
  
  };

  return (
    <div>
      <Formik
        initialValues={{
            password: '',
            contrasenia: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form className='container'>
            <h1>Ingresa nueva contraseña</h1>
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
