import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Campo obligatorio').max(100),
  password: Yup.string().required('Campo obligatorio').max(100),
});
const user = {
  email: "pablo@gmail.com",
  password: "123"
}

const Login = ({ setLoggedIn }) => { 
  const [captcha, setCaptcha]= useState(null)
  const recaptchaRef = useRef(null)
  const navigate = useNavigate();

  const onChange = () =>{
    console.log('elusuario no es un robot')
  }
  
  const handleSubmit = (values) => {
  
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      alert('Por favor, complete el reCAPTCHA.');
      return;
    }

    if(values.email == user.email && values.password== user.password){
      console.log(values.email);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('loggedIn', true);
      navigate('/home', { state: { replace: true } });
      setLoggedIn(true);
    }
    
    
    // ... Realizar la solicitud al servidor aquí ...
  };

  return (
    <div>
      <button onClick={() => navigate('/start')}>
        Volver al inicio
      </button>
      
      <Formik
        initialValues={{
         
          email: '',
          password: '',
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
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.email && touched.email)}
                    helperText={(errors.email && touched.email) && errors.email}
                    value={values.email}
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
                <a href='/change-password' >¿Olvidaste tu Contraseña?</a>
             

                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="keepSesion"
                        
                        checked={values.keepSesion}
                        onChange={handleChange}
                      />
                    }
                    label="Mantener Sesion"
                  />
                 
                </div>
                <div className='recap'>
                  <ReCAPTCHA sitekey='6LeTDagnAAAAAIoVwYCKw3YJmAZgT6xxel9L9gIF' ref={recaptchaRef} onChange={onChange} />
                </div>
                {/* Botón de registro */}
                <button  type="submit" >
                  Iniciar Sesion
                </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
