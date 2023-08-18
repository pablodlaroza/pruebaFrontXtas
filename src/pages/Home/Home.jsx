import React from 'react'

function Home() {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  return (
    <div>
        <h1>Bienvenido {user.email}</h1>
    </div>
  )
}

export default Home