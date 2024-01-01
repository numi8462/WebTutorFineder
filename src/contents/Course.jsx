import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext'
import { useNavigate, Link } from "react-router";
import axios from 'axios';
import courseImg from "../images/course1.png";
import firebase from "firebase/compat/app";

export const Course = () => {
    const { cid } = useParams(); // Get the course id from the URL
    const [course, setCourse] = useState(null);
    const [tutor, setTutor] = useState();
    const [student, setStudent] = useState({});
    const { currentUser } = useAuth()
    const navigate = useNavigate();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        }
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/profile/${currentUser.uid}`)
        .then((response) => {
            setStudent(response.data);
        })
        // Fetch the course details
        axios.get(`http://localhost:3001/getCourse/${cid}`)
            .then(response => {
                console.log('Course data:', response.data);
                setCourse(response.data);
                // fetch tutor info
                const tutorId = response.data.tutorID;
                console.log('Tutor ID:', tutorId);
                axios.get(`http://localhost:3001/getTutors/${tutorId}`)
                    .then(response => {
                        console.log('Tutor data:', response.data);
                        setTutor(response.data);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, [cid]); // Dependency array

    // Render the course details
    return (
        <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>TutorFinder</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link href="dashboard.css" rel="stylesheet" type="text/css" />
        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <p>Tutor<span>Finder</span>.</p>
          </div>
          <div className="sidebar-menu">
            <ul>           
              <li>
                <a onClick={() => navigate('/studentDashboard')}><span className="fa-solid fa-list-check" />
                  <span>My Courses</span></a>
              </li>
              <li>
                <a onClick={() => navigate('/findcourses')} className="active"><span className="fa-solid fa-magnifying-glass" />
                  <span>Search courses</span></a>
              </li>
              <li>
                <a href=""><span className="fa-solid fa-heart" />
                  <span>Saved</span></a>
              </li>
              <li>
                <a href=""><span className="fa-solid fa-user" />
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
                  <span className="fa-solid fa-bars" />
                </label>
                Courses
              </h1>
            </div>
            <div className="user-wrapper">
              <div>
                <h4>{student.name}</h4>
                <small>Student</small>
              </div>
            </div>
          </header>

          <main>
            { course && tutor ? (
            <div className="course-card">
                <div className="tutor-pp">
                    <img src={courseImg} alt="profile picture"/>
                </div>

                <div className="tutor-info">
                    <div className="tutor-info-top">
                        <span><i className="fa-solid fa-user"></i>{tutor.name}</span>
                        <span><i className="fas fa-hourglass"></i>{course.hours} hours</span>
                    </div>
                    <h4>{course.subject}</h4>
                    <p>{course.description}</p>
                    <span className="price">${course.cost} per hour</span>
                </div>
                <div className="buttons">
                    <button type="button">Send Request</button>
                    <button type="button">Contact the tutor</button>
                </div>
            </div>
            ) : (
                <></>
            )}
          </main>
        </div>
      </div>
    );
};
