import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import firebase from "firebase/compat/app";
import axios from 'axios';
import '../index.css';


export const Profile = (props) => {
  const [student, setStudent] = useState({});
  const [tutor, setTutor] = useState({});

  // const { uid } = useParams();
  const [uid, setUid] = useState('')

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
    }
  });

 useEffect(() => {
  axios.get(`http://localhost:3001/getUser/${uid}`)
    .then((response) => {
      if(response.data.role == "student"){
        setStudent(response.data);
      } else {
        setTutor(response.data);
      }

    })
    .catch((error) => {
      console.error("Error fetching profile data:", error);
    });
}, [uid]);

  return (
    <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <title>TutorFinder</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            <link href="dashboard.css" rel="stylesheet" type="text/css" />
            <input type="checkbox" id="nav-toggle"/>
            <div className="sidebar">
                <div className="sidebar-brand">
                    <p>Tutor<span>Finder</span>.</p>
                </div>

                <div className="sidebar-menu">
                    <ul>
                        <li>
                            <a><span className="fa-solid fa-list-check"></span>
                            <span>My Courses</span></a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/findcourses')}><span className="fa-solid fa-magnifying-glass"></span>
                            <span>Search courses</span></a>
                        </li>
                        <li>
                            <a href=""><span className="fa-solid fa-heart"></span>
                            <span>Saved</span></a>
                        </li>
                        <li>
                            <a className="active" href=""><span className="fa-solid fa-user"></span>
                            <span>My Account</span></a>
                        </li>
                    </ul>

                </div>

            </div>

        <div className="main-content">
            <header>
                <div className="header-title">
                    <h1>
                    <label htmlFor="nav-toggle">
                        <span className="fa-solid fa-bars"></span>
                    </label>
                    My account
                    </h1>
                </div>
                <div className="user-wrapper">
                    <div>
                        <h4>{student.name}</h4>
                        <small>Student</small>
                    </div>
                </div>
            </header>
        
            <main className='main'>
            
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
                <button className="btn">Update your info</button>
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

            </main>
        </div>
    </div>
  );
};

