import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/AuthContext';
import firebase from "firebase/compat/app";
import axios from 'axios';
import '../../index.css';
import Course from './Matching-Course'

export const Matching = (props) => {
    const [student, setStudent] = useState({});
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const [uid, setUid] = useState('');
    const { logout } = useAuth();
    // const [myUni, setMyUni] = useState(false);
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');  // Navigate to /login
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await axios.get(`http://localhost:3001/profile/${uid}`);
                setStudent(profileResponse.data);
                const coursesResponse = await axios.get(`http://localhost:3001/getCourses`);
                const courses = coursesResponse.data;
                const filteredCoursesPromises = courses.map(async (course) => {
                    if (profileResponse.data.subjectOfInterest.includes(course.subject)) {
                        return course;
                    } else {
                        const tutorResponse = await axios.get(`http://localhost:3001/getTutors/${course.tutorID}`);
                        console.log(tutorResponse.data.uni)
                        if (tutorResponse.data.major === profileResponse.data.major) {
                            return course;
                        }
                    }
                });
                const filteredCourses = await Promise.all(filteredCoursesPromises);
                setCourses(filteredCourses.filter(Boolean)); // filter out any undefined values
                console.log(filteredCourses)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
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
                            <a onClick={() => navigate('/studentDashboard')}><span className="fa-solid fa-list-check"></span>
                            <span>My Courses</span></a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/findcourses')}><span className="fa-solid fa-magnifying-glass"></span>
                            <span>Search courses</span></a>
                        </li>
                        <li>
                            <a className="active" ><span className="fa-solid fa-heart"></span>
                            <span>Match a Tutor</span></a>
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
                        Match a Tutor
                        </h1>
                    </div>
                    <div className="user-wrapper">
                        <div className='user-wrapper-field'>
                            <h4><span><i className='fa-solid fa-user'></i></span> {student.name}</h4> 
                            <small>Student</small>
                        </div>

                        <button className='logout-btn' onClick={handleLogout}>
                        <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
                        </button>
                    </div>
                </header>

                <main>
                {/* Main section */}
                    <div className='main-container'>
                        <h2 style={{marginTop: '2rem'}}>Here are your Recommended Tutors and their Courses</h2>
                        <table className="tut-matching-table">
                            {courses.map(course => (
                                    <Course key={course._id} course={course} student={student}/>
                                ))}
                        </table>
                    </div>
                {/* Main section */}
                </main>
            </div>
        </div>
    );
}

