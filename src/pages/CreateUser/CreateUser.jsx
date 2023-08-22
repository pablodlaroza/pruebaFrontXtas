import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControlLabel, Grid , Container} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import swal from 'sweetalert';


import './CreateUser.css'

const SignupSchema = Yup.object().shape({
  primer_nombre: Yup.string().required('Campo obligatorio').max(50),
  secondName: Yup.string().max(50),
  primer_apellido: Yup.string().required('Campo obligatorio').max(50),
  secondLastName: Yup.string().max(50),
  correo: Yup.string().email('Correo inválido').required('Campo obligatorio').max(100),
  password: Yup.string().required('Campo obligatorio').max(100),
  contrasenia: Yup.string()
    .required('Campo obligatorio')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .max(100),
  acceptTerms: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones'),
});

const CreateUser = ({setLoggedIn, loggedIn} ) => { 
  const [captcha, setCaptcha]= useState(null)
  const recaptchaRef = useRef(null)
  const navigate = useNavigate();

  const onChange = () =>{
    console.log('elusuario no es un robot')
  }
  
  const handleSubmit = async (values) => {
    const response = await axios.post('http://pruebaxkape1.com.devel/api/plataforma/registrar', values)
    console.log(response)
    

    if(response.status == 201){
      swal("Registro existoso", "", "success");
      navigate('/Iniciar Sesión', { state: { replace: true } });
     
    }else{
      swal("Registro Fallido", "", "error");
    }
    
    

    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      alert('Por favor, complete el reCAPTCHA.');
      return;
    }
    
    // Lógica para enviar los datos al servidor (signup)
    // console.log('Valores enviados:', values);
    // ... Realizar la solicitud al servidor aquí ...
  };

  return (
    <Container  maxWidth="sm">
      {/* <button onClick={() => navigate('/')}>
        Volver al inicio
      </button> */}
      
      <Formik
        initialValues={{
          primer_nombre: '',
          secondName: '',
          primer_apellido: '',
          secondLastName: '',
          correo: '',
          password: '',
          contrasenia: '',
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
                    name="primer_nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.primer_nombre && touched.primer_nombre)}
                    helperText={(errors.primer_nombre && touched.primer_nombre) && errors.primer_nombre}
                    value={values.primer_nombre}
                    onChange={handleChange}
                    inputProps={{ maxLength: 50 }}
                    autoComplete="off"
                  />
                </div>
                <div >
                  <TextField
                    label="Primer Apellido"
                    name="primer_apellido"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.primer_apellido && touched.primer_apellido)}
                    helperText={(errors.primer_apellido && touched.primer_apellido) && errors.primer_apellido}
                    value={values.primer_apellido}
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
                <button  type="submit" className='button2'>
                  Registrarse
                </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreateUser;
