import logo from './logo.svg';
import './App.css';
import { Login } from "./LoginRegister/Login"
import { Register } from "./LoginRegister/Register"
import React, { useState } from "react";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (form) => {
    setCurrentForm(form);
  }

  return (
    <div className="App">
      {
        currentForm === 'login' ? <Login onSwitch ={toggleForm}/> : <Register onSwitch={toggleForm}/>
      }
    </div>
  );
}

export default App; 
