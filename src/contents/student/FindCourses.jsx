import axios from 'axios';
import React, { useState, useEffect  } from "react";
import { useAuth } from '../../authentication/AuthContext'
import firebase from "firebase/compat/app";
import { useNavigate } from 'react-router-dom';

export const FindCourses = (props) => {
    const [uid, setUid] = useState('')
    const [course, setCourses] = useState([])
    const [student, setStudent] = useState({});
    const { currentUser } = useAuth()
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState(''); // Empty string = Default
    const [searchTerm, setSearchTerm] = useState('');
    const [degree, setDegree] = useState('all');
    const [subject, setSubject] = useState('all');
    const imageMap = {
      'Creative Arts and Design': require('../../images/Creative Arts and Design.png'),
      'Marketing': require('../../images/Marketing.png'),
      'Business and Management': require('../../images/Business and Management.png'),
      'IT': require('../../images/IT.png'),
      'Software Development': require('../../images/Software Development.png'),
      'Engineering': require('../../images/Engineering.png'),
      'Law': require('../../images/Law.png'),
      // add more subjects and images as needed
  };

  const options = [
    { value: 'Creative Arts and Design', label: 'Creative Arts and Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Business and Management', label: 'Business and Management' },
    { value: 'IT', label: 'IT' },
    { value: 'Software Development', label: 'Software Development' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Law', label: 'Law' },
  ];

    function capitalizeFirstLetter(str) {
      if (str && typeof str === 'string') {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
      return '';
    }

    const handleSortOption = () => {
      if (sortOption === '') {
        setSortOption('costHighToLow');
      } else if (sortOption === 'costHighToLow') {
        setSortOption('costLowToHigh');
      } else {
        setSortOption('costHighToLow');
      }
    };

    const handleSortOptionHour = () => {
      if (sortOption === '') {
        setSortOption('hoursHighToLow');
      } else if (sortOption === 'hoursHighToLow') {
        setSortOption('hoursLowToHigh');
      } else {
        setSortOption('hoursHighToLow');
      }
    };

    const handleChange = (event) => {
      setDegree(event.target.value);
      setSortOption(event.target.value);     

    };
    const handleSubChange = (event) => {
      setSubject(event.target.value);
      setSortOption(event.target.value);      
    };

    useEffect(() => {
        if (!currentUser) {
          return; 
        }
    
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/profile/${currentUser.uid}`);
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
      }, [currentUser, uid, sortOption, searchTerm]);
      

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

              <div className='user-wrapper-field'>
                <h4><span><i className='fa-solid fa-user'></i></span> {student.name}</h4> 
                <small>Student</small>
              </div>
              
            </div>
          </header>
          <main>
            <div className="main-container">
              <h2>Search for courses</h2>
              <div className="search">
                <div className="search-wrapper">
                  <div className="search-wrapper-content">
                  <input
                    type="search"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                    <div className='search-button'>
                    <button class="fa-solid fa-magnifying-glass"></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-container">
                <div className="category-head">
                  <ul>
                    <div className="category-title" id="all" onClick={() => setSortOption('all')}>
                    <span><i className="fas fa-border-all" ></i></span>
                      <li>All</li>
                      
                    </div>
                    <div className="category-title" id="price" onClick={handleSortOption}>
                      <span><i className="fas fa-coins"></i> </span>
                      <li>Price {sortOption === 'costHighToLow' ? <i class="fa fa-caret-down" aria-hidden="true"></i> : sortOption === 'costLowToHigh' ? <i class="fa fa-caret-up" aria-hidden="true"></i> : ''}</li>
                    </div>
                    <div className="category-title" id="hours" onClick={() => handleSortOptionHour('hoursHighToLow')}>
                    <span><i className="fas fa-hourglass"></i></span>
                    <li>
                      Hours {sortOption === 'hoursHighToLow' ? <i class="fa fa-caret-down" aria-hidden="true"></i> : sortOption === 'hoursLowToHigh' ? <i class="fa fa-caret-up" aria-hidden="true"></i> : ''}
                    </li>
                      
                    </div>
                    <div className="category-title" id="university" onClick={() => setSortOption(`university-${student.uni}`)}>
                    <span><i className="fas fa-landmark" /></span>
                      <li>My Uni</li>
                      
                    </div>

                      <select className='category-title' value={degree} onChange={handleChange}>
                        <option value="all">All Degrees</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="doctorate">Doctorate's Degree</option>
                        <option value="masters">Master's Degree</option>
                        <option value="teaching">Teaching Degree</option>
                      </select>

                      <select className='category-title' value={subject} onChange={handleSubChange}>
                        
                        <option value="">All Subjects</option>
                        <option value="Creative Arts and Design">Creative Arts and Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Business and Management">Business and Management</option>
                        <option value="IT">IT</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Law">Law</option>
                      </select>

                    

                  </ul>
                  <div className="tutors-collect">
                    <div className="tutors-main-container">
                      {course.map((item, index) => (
                        <div className="all-location" key={index} >
                            <div className='post-img'>
                              <img src={imageMap[item.subject]} alt="post" /> 


                            </div>
                            <div className='post-content'>
                                <h4>{item.name}</h4>

                                <p>{item.description}</p>
                                
                                <div className='post-content-top'>
                                  <span><i className='fa fa-book'></i> {item.subject}</span>
                                  
                                  <span><i className='fas fa-hourglass'></i> Total {item.hours} hours</span>

                                  <span><i className='fas fa-money-bill-wave'></i> ${item.cost} per hour</span>
                                </div>

                                <h4>Tutor Info</h4>
                                <div className='post-content-top'>
                                
                                  <span><i className="fa-solid fa-building-columns"></i> {capitalizeFirstLetter(item.tutUni)}</span>
                                  <span><i className='fa-solid fa-scroll'></i> {capitalizeFirstLetter(item.tutDegree)} Degree</span>
                                </div>

                              </div>

                            <div>
                              <button type="button" className="read-btn" onClick={() => navigate(`/course/${item._id}`)}>View Course</button>

                            </div>
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

