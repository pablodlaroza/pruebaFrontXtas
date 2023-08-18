import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import './CreateUser.css'

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Campo obligatorio').max(50),
  secondName: Yup.string().max(50),
  lastName: Yup.string().required('Campo obligatorio').max(50),
  secondLastName: Yup.string().max(50),
  email: Yup.string().email('Correo inválido').required('Campo obligatorio').max(100),
  password: Yup.string().required('Campo obligatorio').max(100),
  confirmPassword: Yup.string()
    .required('Campo obligatorio')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .max(100),
  acceptTerms: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones'),
});

const CreateUser = () => { 
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
    
    // Lógica para enviar los datos al servidor (signup)
    console.log('Valores enviados:', values);
    // ... Realizar la solicitud al servidor aquí ...
  };

  return (
    <div>
      <button onClick={() => navigate('/start')}>
        Volver al inicio
      </button>
      
      <Formik
        initialValues={{
          firstName: '',
          secondName: '',
          lastName: '',
          secondLastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form className='container'>
            <h1>Registrarse</h1>
            <Grid container spacing={2}>
              <Grid item xs={6} > {/* Primera columna */}
                <div>
                  <TextField
                    label="Primer Nombre"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.firstName && touched.firstName)}
                    helperText={(errors.firstName && touched.firstName) && errors.firstName}
                    value={values.firstName}
                    onChange={handleChange}
                    inputProps={{ maxLength: 50 }}
                    autoComplete="off"
                  />
                </div>
                <div >
                  <TextField
                    label="Primer Apellido"
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.lastName && touched.lastName)}
                    helperText={(errors.lastName && touched.lastName) && errors.lastName}
                    value={values.lastName}
                    onChange={handleChange}
                    inputProps={{ maxLength: 50 }}
                    autoComplete="off"
                  />
                </div>
            
              </Grid>
              <Grid item xs={6} > {/* Segunda columna */}
                <div>
                  <TextField
                    label="Segundo Nombre"
                    name="secondName"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={values.secondName}
                    onChange={handleChange}
                    inputProps={{ maxLength: 50 }}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <TextField
                    label="Segundo Apellido"
                    name="secondLastName"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={values.secondLastName}
                    onChange={handleChange}
                    inputProps={{ maxLength: 50 }}
                    autoComplete="off"
                  />
                </div>
               
                
               
              </Grid>
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
                <div>
                  <TextField
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                    helperText={(errors.confirmPassword && touched.confirmPassword) && errors.confirmPassword}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    inputProps={{ maxLength: 100 }}
                  />
                </div>



                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="acceptTerms"
                        color="primary"
                        checked={values.acceptTerms}
                        onChange={handleChange}
                      />
                    }
                    label="Acepto los términos y condiciones"
                  />
                  {errors.acceptTerms && <div className="error-message">{errors.acceptTerms}</div>}
                </div>
                <div className='recap'>
                  <ReCAPTCHA sitekey='6LeTDagnAAAAAIoVwYCKw3YJmAZgT6xxel9L9gIF' ref={recaptchaRef} onChange={onChange} />
                </div>
                {/* Botón de registro */}
                <Button  type="submit" variant="contained" color="primary">
                  Registrarse
                </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUser;
