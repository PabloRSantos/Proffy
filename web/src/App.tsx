import React from 'react';
import "./assets/styles/global.css"
import Routes from './Routes';
import {AuthProvider} from './contexts/auth'

function App() {
  return (
    <AuthProvider>
       <Routes />
    </AuthProvider>
  );
}

export default App;
