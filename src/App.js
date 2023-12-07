import logo from './logo.svg';
import './App.css';
import { Login } from "./LoginRegister/Login"
import { Register } from "./LoginRegister/Register"
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Routes, Navigate } from 'react-router-dom';
import Profile from './profile/Profile';

function App() {
  const [currentForm, setCurrentForm] = useState('login');



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} /> {/* Default route */} 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App; 
