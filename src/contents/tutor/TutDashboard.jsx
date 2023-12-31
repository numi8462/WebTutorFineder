import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import axios from 'axios';
import '../../contents/dashboard.css';

export const TutDashboard = (props) => {
  const [tutor, setTutor] = useState({});
  const [courses, setCourses] = useState([]);
  const [tutorUID, setTutorUID] = useState(null);

  const fetchTutorInfo = async (uid) => {
    try {
      const tutorDoc = await firebase.firestore().collection('tutors').doc(uid).get();
      if (tutorDoc.exists) {
        setTutor(tutorDoc.data());
      } else {
        console.error('Tutor not found.');
      }
    } catch (error) {
      console.error('Error fetching tutor information:', error);
    }
  };

  const fetchCourses = async (uid) => {
    try {
      const coursesCollection = await firebase.firestore().collection('courses')
        .where('tutorID', '==', uid)
        .get();

      const coursesData = coursesCollection.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const deleteCourse = async (cid) => {
    try {
      // Make a DELETE request to the server endpoint
      await axios.delete(`http://localhost:3001/courses/${cid}`);
      
      // Refresh the courses after deletion
      fetchCourses(tutorUID);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        setTutorUID(uid); // Set tutorUID in the state
        fetchTutorInfo(uid);
        fetchCourses(uid);
      }
    });

    // Cleanup function for unsubscribing when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <p>Tutor<span>Finder</span>.</p>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <a href="" className="active">
                <span className="fa-solid fa-list-check"></span>
                <span>Courses</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="fa-solid fa-heart"></span>
                <span>Favorites</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="fa-solid fa-user"></span>
                <span>Account</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="fa-solid fa-bookmark"></span>
                <span>Saved</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="fa-solid fa-list-check"></span>
                <span>Courses</span>
              </a>
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
              Dashboard
            </h1>
          </div>
          <div className="search-wrapper">
            <input type="search" placeholder="Search here" />
          </div>
          <div className="user-wrapper">
            <div>
              <h4>{tutor.name}</h4>
              <small>Tutor</small>
            </div>
          </div>
        </header>

        <main>
          <div className="cards">
            <div className="card-single">
              <div>
                <h1>3</h1>
                <span>Completed</span>
              </div>
              <div>
                <span className="fa-solid fa-check"></span>
              </div>
            </div>

            <div className="card-single">
              <div>
                <h1>2</h1>
                <span>In Progress</span>
              </div>
              <div>
                <span className="fa-solid fa-fire"></span>
              </div>
            </div>

            <div className="card-single">
              <div>
                <h1>5</h1>
                <span>Total</span>
              </div>
              <div>
                <span className="fa-solid fa-thumbtack"></span>
              </div>
            </div>
          </div>

          <div className="recent-flex">
            <div className="courses">
              <div className="card">
                <div className="card-header">
                  <h3>Your courses</h3>
                  <button>
                    See all <span className="fa-solid fa-chevron-down"></span>
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Course title</td>
                          <td>Area</td>
                          <td>Duration</td>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course, index) => (
                          <tr key={index}>
                            <td>{course.name}</td>
                            <td>{course.subject}</td>
                            <td>{course.hours}</td>
                            <td>
                              <button onClick={() => deleteCourse(course._id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="requests">
              <div className="card">
                <div className="card-header">
                  <h3>Requests</h3>
                  <button>
                    See all <span className="fa-solid fa-chevron-down"></span>
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Course name</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>John Doe</td>
                          <td>Language Arts Workshop</td>
                          <td>
                            <span className="status"></span>
                            pending
                          </td>
                          <td>
                            <button>
                              Approve
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
