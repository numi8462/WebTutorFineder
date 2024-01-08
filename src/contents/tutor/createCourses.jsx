import React, { useState, useEffect } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import axios from 'axios';
import '../../contents/dashboard.css';


  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     setTutorUID(user.uid);
  //   }
  // });
 export const CreateCourse = () => {
    const [subject, setSubject] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [hours, setHours] = useState('');
    const [cost, setCost] = useState('');
    const [tutor, setTutor] = useState(null);
    const navigate = useNavigate();

    const getTutorIDFromAuthenticatedUser = () => {
        const user = firebase.auth().currentUser;
        if (user) {
          return user.uid;
        } else {
          // Handle the case where the user is not authenticated
        //   console.error('No authenticated user found.');
          return null;
        }
      };
  
    const tutorID = getTutorIDFromAuthenticatedUser(); 

    const handleCreateCourse = async (e) => {
        e.preventDefault();
    
        try {
          // Make a request to your server to create a new course
          await axios.post('http://localhost:3001/postCourse', {
            subject,
            name,
            description,
            hours,
            cost,
            tutorID,
          });
        // Navigate back to tutor dashboard after creating a course
          navigate('/tutorDashboard');
        } catch (error) {
          console.error('Error creating course:', error);
        }
      };

      useEffect(() => {
        const fetchTutorInfo = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/getTutors/${tutorID}`);
            const tutorData = response.data;
            setTutor(tutorData);
          } catch (error) {
            console.error('Error fetching tutor information:', error);
          }
        };
    
        // Check if tutorID is available and fetch tutor information
        if (tutorID) {
          fetchTutorInfo();
        }
      }, [tutorID]);

  return (
    <>
      <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <title>TutorFinder</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            <link href="dashboard.css" rel="stylesheet" type="text/css" />
            <div className="sidebar">
                <div className="sidebar-brand">
                    <p>Tutor<span>Finder</span>.</p>
                </div>
                <div className="sidebar-menu">
                    <ul>
                        <li>
                            <a className="active" onClick={() => navigate('/tutorDashboard')}><span className="fa-solid fa-list-check"></span>
                            <span>My Courses</span></a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/profile')}><span className="fa-solid fa-magnifying-glass"></span>
                            <span>Profile</span></a>
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
                    My courses
                    </h1>
                </div>
                <div className="user-wrapper">
                    <div>
                        <h4>{tutor ? tutor.name : 'Loading...'}</h4>
                        <small>Tutor</small>
                    </div>
                </div>
            </header>  
            <main>
                <div className="recent-flex">
                    <div className="courses">
                        <div className="card">
                            <div className="card-header">
                                <h3>Creating a new Course</h3>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                <form onSubmit={handleCreateCourse} width="100%" id="createcourse-form">
                                    <label id="createcourse-label">
                                    Subject:
                                    <input id="createcourse-input" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    </label>
                                    <br />
                                    <label>
                                    Name:
                                    <input id="createcourse-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    </label>
                                    <br />
                                    <label id="createcourse-label">
                                    Description:
                                    <textarea id="createcourse-textarea" type="text" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" cols="50" />
                                    </label>
                                    <br />
                                    <label id="createcourse-label">
                                    Hours:
                                    <input id="createcourse-input" type="number" value={hours} onChange={(e) => setHours(e.target.value)} />
                                    </label>
                                    <br />
                                    <label>
                                    Cost:
                                    <input id="createcourse-input" type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
                                    </label>
                                    <br />
                                    <button id="createcourse-button" type="submit">Create Course</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
</>
);
};

export default CreateCourse;