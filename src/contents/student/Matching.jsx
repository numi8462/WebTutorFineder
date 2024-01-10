import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/AuthContext';
import firebase from "firebase/compat/app";
import axios from 'axios';
import '../../index.css';

export const Matching = (props) => {
    const [student, setStudent] = useState({});
    const [tutor, setTutor] = useState({});
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const [uid, setUid] = useState('');
  
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

        axios.get(`http://localhost:3001/getCourses`)
            .then(res => {
                setCourses(res.data)
            })
    }, [uid]);

    const filteredCourses = courses.filter(course => {
        return student.major === course.subject || student.subjectOfInterest.includes(course.subject);
    });

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
                            <a onClick={() => navigate('/studentDashboard')}><span className="fa-solid fa-list-check"></span>
                            <span>My Courses</span></a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/findcourses')}><span className="fa-solid fa-magnifying-glass"></span>
                            <span>Search courses</span></a>
                        </li>
                        <li>
                            <a className="active" ><span className="fa-solid fa-heart"></span>
                            <span>Match Tutor</span></a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/profile')}><span className="fa-solid fa-user"></span>
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
                        Match Tutor
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
                {/* Main section */}
                    <div className="recent-flex">
                        <div className="courses">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Match results</h3>
                                    <button>See all <span className="fa-solid fa-chevron-down"></span></button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                    <table width="100%">
                                        <thead>
                                            <tr>
                                                <td>Course title</td>
                                                <td>Subject</td>
                                                <td>Tutor</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            {filteredCourses.map(course => (
                                                    <Course key={course.cid} course={course}/>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </div>

                            </div>
                        </div>
                        
                    </div>
                {/* Main section */}
                </main>
            </div>
        </div>
    );
}

const Course = ({ course }) => {
    const [tutor, setTutor] = useState(null);

    useEffect(() => {
        // Fetch the tutor's data
        axios.get(`http://localhost:3001/getTutors/${course.tutorID}`)
            .then(res => {
                setTutor(res.data);
            });
    }, [course.tutorID]);

    if (!tutor) {
        return <div>Loading...</div>;
    }

    return (
        <tr>
            <td>{course.name}</td>
            <td>{course.description}</td>
            <td>{tutor.name}</td>
        </tr>
    );
};