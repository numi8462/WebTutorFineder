import logo from './logo.svg';
import './App.css';
import { Login } from "./contents/Login"
import { Register } from "./contents/Register"
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Routes, Navigate } from 'react-router-dom';
import Profile from './contents/Profile';
import Details from './contents/Details'
import { AuthProvider, useAuth } from './authentication/AuthContext'


function App() {
  const [currentForm, setCurrentForm] = useState('login');



  return (
    
    <Router>
      <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="*" element={<Navigate to="/details" />} /> {/* Default route */} 
          <Route path="/details" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </div>
      </AuthProvider>
    </Router>

  );
}

export default App; 
