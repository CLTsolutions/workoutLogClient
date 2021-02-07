import React, { useEffect, useState } from 'react';
import Auth from './auth/Auth';
import Sitebar from './home/navbar';

function App() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  return (
    <div>
      <Auth /> 
      <Sitebar />
    </div>
  );
}

export default App;