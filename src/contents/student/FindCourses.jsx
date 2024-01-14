import axios from 'axios';
import React, { useState, useEffect  } from "react";
import { useAuth } from '../../authentication/AuthContext'
import firebase from "firebase/compat/app";
import { useNavigate } from 'react-router-dom';
import courseImg from '../../images/course1.png';

export const FindCourses = (props) => {
    const [uid, setUid] = useState('')
    const [course, setCourses] = useState([])
    const [student, setStudent] = useState({});
    const { currentUser } = useAuth()
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState(''); // Empty string = Default
    const [searchTerm, setSearchTerm] = useState('');
  

    
    useEffect(() => {
      // axios.get(`http://localhost:3001/profile/${currentUser.uid}`)
      // .then((response) => {
      //     setStudent(response.data);
      //     console.log(response.data.name);
      // })
      // .catch((error) => {
      //     console.error("Error fetching profile data:", error);
      // });
      // axios.get(`http://localhost:3001/profile/${currentUser.uid}`)
      // .then((response) => {
      //     setStudent(response.data);
      //     console.log(response.data.name);
      // })
      // .catch((error) => {
      //     console.error("Error fetching profile data:", error);
      // });


      // axios.get(`http://localhost:3001/getCourses`)
      //   .then(response => {
      //     console.log(response.data); // Log the response data
      //     setCourses(response.data);
      //   }).catch(err => console.log(err));

      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/profile/${uid}`);
          setStudent(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
  
      const fetchCourses = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/getFilteredCourses?search=${searchTerm}&sort=${sortOption}`);
          setCourses(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
  
      const handleAuthStateChange = (user) => {
        if (user) {
          setUid(user.uid);
          fetchData(); // Fetch student data when user logs in
        }
      };
  
      const authUnsubscribe = firebase.auth().onAuthStateChanged(handleAuthStateChange);
  
      // Fetch courses when any of the dependencies change
      fetchCourses();
  
      return () => {
        // Cleanup the auth state subscription
        authUnsubscribe();
      };
  }, [uid, sortOption, searchTerm]);
      

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
                <a className='active'><span className="fa-solid fa-magnifying-glass" />
                  <span>Search courses</span></a>
              </li>
              <li>
                <a onClick={() => navigate('/matching')}><span className="fa-solid fa-heart" />
                  <span>Match Tutor</span></a>
              </li>
              <li>
                <a onClick={() => navigate('/profile')}><span className="fa-solid fa-user" />
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
            <div className="main-container">
              <h2>Search for courses and find your <span>tutor</span></h2>
              <div className="search">
                <div className="search-wrapper">
                  <div className="search-wrapper-content">
                  <input
                    type="search"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  </div>
                </div>
              </div>
              <div className="filter-container">
                <div className="category-head">
                  <ul>
                    <div className="category-title" id="all">
                      <span onClick={() => setSortOption('')}><i className="fas fa-border-all" ><li>All</li></i></span>
                    </div>
                    <div className="category-title" id="location">
                      <li>Location</li>
                      <span><i className="fa-solid fa-location-dot" /></span>
                    </div>
                    <div className="category-title" id="price">
                      <span onClick={() => setSortOption('costHighToLow')}><i className="fas fa-coins">Price(High to Low)</i> </span>
                    </div>
                    <div className="category-title" id="hours">
                      <span onClick={() => setSortOption('hoursHighToLow')}><i className="fas fa-hourglass"> <li>Hours(High to Low)</li></i></span>
                    </div>
                    <div className="category-title" id="university">
                      <li>University</li>
                      <span><i className="fas fa-landmark" /></span>
                    </div>
                    <div className="category-title" id="degree">
                      <li>Degree level</li>
                      <span><i className="fa-solid fa-graduation-cap" /></span>
                    </div>
                  </ul>
                  <div className="tutors-collect">
                    <div className="tutors-main-container">
                      {course.map((item, index) => (
                        <div className="all location" key={index} >
                            <div className='post-img'>
                              <img src={courseImg} alt="post" />  
                            </div>
                            <div className='post-content'>
                              <div className='post-content-top'>
                                <span><i className='fa-solid fa-user'></i>{item.name}</span>
                                
                                <span><i className='fas fa-hourglass'></i>{item.hours} hours</span>
                                <span><i className='fas fa-money-bill-wave'></i>{item.cost}</span>
                              </div>
                              <h4>{item.subject}</h4>
                              <p>{item.description}
                              </p>
                            </div>
                            <button type="button" className="read-btn" onClick={() => navigate(`/course/${item._id}`)}>Details</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
}

