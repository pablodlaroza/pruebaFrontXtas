import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import swal from 'sweetalert';

const SignupSchema = Yup.object().shape({
  correo: Yup.string().email('Correo inválido').required('Campo obligatorio').max(100),
});


const ForgotPassword = ({ setLoggedIn }) => { 
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

  
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      alert('Por favor, complete el reCAPTCHA.');
      return;
    }
  };

  return (
    <div>
    
      
      <Formik
        initialValues={{
          correo: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form className='container'>
            <h1>Cambiar Contraseña</h1>
           
            <div>
                  <TextField
                    label="Correo"
                    name="correo"
                    type="email"
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
                    
                
                <div className='recap'>
                  <ReCAPTCHA sitekey='6LeTDagnAAAAAIoVwYCKw3YJmAZgT6xxel9L9gIF' ref={recaptchaRef} onChange={onChange} />
                </div>
                {/* Botón de registro */}
                <button className='button2'  type="submit" >
                  Enviar Link
                </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
