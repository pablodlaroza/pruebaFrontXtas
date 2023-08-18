import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';


function ForgotPassword() {


    const recaptchaRef = useRef(null)

    // const recaptchaValue = recaptchaRef.current.getValue();

    const onChange = () =>{
        console.log('elusuario no es un robot')
      }
      
  return (
    <div>
      <a href='/start'>
        Volver al inicio
      </a>
      <div className='recap'>
        <ReCAPTCHA sitekey='6LeTDagnAAAAAIoVwYCKw3YJmAZgT6xxel9L9gIF' ref={recaptchaRef} onChange={onChange} />
      </div>
    </div>
  )
}

export default ForgotPassword