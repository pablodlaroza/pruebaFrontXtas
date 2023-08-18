import React from 'react'
import { useNavigate } from 'react-router-dom'

function Start() {
    const navigate = useNavigate();

  return (
    
    <div>
        <button onClick={()=> navigate('/login')}>
            Iniciar Sesion
        </button>
        <h1>gola</h1>
        <button onClick={()=> navigate('/register')}>
            Registrate
        </button>
    </div>
  )
}

export default Start