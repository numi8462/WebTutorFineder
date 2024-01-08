import logo from './logo.svg';
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Login } from "./contents/Login"
import { Register } from "./contents/Register/Register"
import { RegisterTut } from "./contents/Register/RegisterTut"
import { Profile } from './contents/Profile';
import { Detail } from './contents/Detail';
import { AuthProvider, useAuth } from './authentication/AuthContext'
import { FindCourses } from './contents/student/FindCourses'
import { Course } from './contents/Course'
import { StuDashboard } from './contents/student/StuDashboard';
import { TutDashboard } from './contents/tutor/TutDashboard';
import { ForgotPassword } from './contents/ForgotPassword';
import UpdateProfile from './contents/UpdateProfile';
import CreateCourse from './contents/tutor/createCourses'
// import Homepage from './homepage-frontend/homepage'

function App() {
  const [currentForm, setCurrentForm] = useState('login');



  return (
    
    <Router>
      <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} /> {/* Default route */} 
          <Route path="/details" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/registerTutor" element={<RegisterTut  />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/findcourses' element={<FindCourses/>}/>
          <Route path='/course/:cid' element={<Course/>}/> 
          <Route path='/studentDashboard' element={<StuDashboard/>}/>
          <Route path='/tutorDashboard' element={<TutDashboard/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path="/updateProfile" element={<UpdateProfile/>}/>
          <Route path='/createCourse' element={<CreateCourse/>}/>
          {/* <Route path='/homepage' element={<Homepage/>}/> */}
        </Routes>
      </div>
      </AuthProvider>
    </Router>

  );
}

export default App; 
