import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/AuthContext';
import firebase from "firebase/compat/app";
import axios from 'axios';
import '../../index.css';


export const Profile = (props) => {
  const [student, setStudent] = useState({});
  const [tutor, setTutor] = useState({});
  const navigate = useNavigate();
  // const { uid } = useParams();
  const [uid, setUid] = useState('')

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
    }
  });

 useEffect(() => {
  axios.get(`http://localhost:3001/profile/${uid}`)
    .then((response) => {
      setStudent(response.data);

    })
    .catch((error) => {
      console.error("Error fetching profile data:", error);
    });
}, [uid]);

  return (
    
    <div className="wrapper">
      {/* header section starts */}
      <header>
        <div className="logo">
          <p>
            Tutor<span>Finder</span>.
          </p>
        </div>
        <div className="navbar">
          <nav>
            <a href="#home">Home</a>
            <a href="#sign-up">Sign up</a>
            <a href="#log-in">Log in</a>
          </nav>
        </div>
      </header>
      {/* header section ends */}

      {/* main section starts */}
      <div className="div-8">
        <div className="div-9">
          <div className="column">
            <div className="div-10">Edit profile picture</div>
          </div>
          <div className="column-2">
            <div className="div-11">
              <div className="div-12">
                <div className="div-13">Your Student Profile</div>
                <div className="div-14">UID</div>
                <div className="div-15">{student.uid}</div>
                <div className="div-16">Name</div>
                <div className="div-17">{student.name}</div>
                <div className="div-18">Phone number</div>
                <div className="div-19">0123456789</div>
              </div>
              <div className="div-20">
                <div className="div-21">Email</div>
                <div className="div-22">{student.email}</div>
                <div className="div-23">Gender</div>
                <div className="div-24">Male</div>
                <div className="div-25">Day of birth</div>
                <div className="div-26">{student.birthdate}</div>
                <div className="div-27" onClick={() => navigate('/updateProfile')}>Update your info</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="div-28">
        <div className="div-29">
          <div className="div-30">
            <div className="div-31">Your website info</div>
            <div className="div-32">Education Level</div>
            <div className="div-33">{student.educationLevel}</div>
          </div>
          <div className="div-34">
            <div className="div-35">Subject of Interest</div>
            <div className="div-36">{student.subjectOfInterest}</div>
          </div>
        </div>
        <div className="div-37">Credit</div>
        <div className="div-38">{student.credit}$</div>
      </div>
      {/* main section ends */}

    </div>
  );
};

