import React, { useState, useEffect } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../authentication/AuthContext"
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import axios from 'axios';
import '../../contents/dashboard.css';

export const TutDashboard = (props) => {
  const [tutor, setTutor] = useState({});
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState({});
  const [tutorUID, setTutorUID] = useState(null);
  const [session, setSession] = useState([]);
  const [mySession, setMySession] = useState([]);
  const [myCompletedSession, setMyCompletedSession] = useState([]);
  const [myCurrentSession, setMyCurrentSession] = useState([]);
  const [inProgress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     setTutorUID(user.uid);
  //   }
  // });
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');  // Navigate to /login
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        setTutorUID(uid)
        fetchData(uid);
        fetchCourses(uid);
      } 
    });

    return () => unsubscribe();
  }, []);

    useEffect(() => {
        mySession.filter(item => item.hoursLeft === 0).forEach(item => {
            fetchStudentData(item.sid);
        });
    }, [mySession]);

  const fetchCourses = async (uid) => {
    try {
      const response = await axios.get(`http://localhost:3001/getCourses/${uid}`);
      setCourses(response.data);
      // console.log("course data: "+response.data)
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const deleteCourse = async (_id) => {
    if (window.confirm("Are you sure you want to Delete this course?")) {
        try {
            await axios.delete(`http://localhost:3001/courses/${_id}`);
            // Refresh the courses after deletion
            fetchCourses(tutorUID);
          } catch (error) {
            console.error('Error deleting course:', error);
          }
    }

  };

  function fetchStudentData(id) {
    axios.get(`http://localhost:3001/profile/${id}`)
    .then((res) => {
        setStudent(res.data)
        return res.data
    })
  }

  function fetchData(id) { // fetch tutor and session data
    axios.get(`http://localhost:3001/getTutors/${id}`)
    .then((response) => {
        setTutor(response.data);
        return axios.get(`http://localhost:3001/getSessions`);
    })
    .then((response) => {
        const filteredSessions = response.data.filter(session => session.tid === id && session.isConfirmed === false);
        setSession(filteredSessions);
        console.log(filteredSessions);

        // Filter for session.isConfirmed is true
        const confirmedSessions = response.data.filter(session => session.tid === id && session.isConfirmed === true);
        setMySession(confirmedSessions);  // Set mySession with the result
        // console.log(confirmedSessions);

        const completedSessions = response.data.filter(session => session.tid === id && session.isConfirmed === true && session.status === 4);
        setMyCompletedSession(completedSessions);

        const currentSessions = response.data.filter(session => session.tid === id && session.isConfirmed === true && (session.status === 1 || session.status === 3));
        setMyCurrentSession(currentSessions);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  }

  // Function to update the session
  function approveSession(id) { // approve session
    if (window.confirm("Are you sure you want to approve?")) {
        axios.put(`http://localhost:3001/updateSession/${id}`, { status: 1 })
        .then(response => {
            console.log(response.data);
            window.alert("Session Approved");
            fetchData(tutorUID);
        })
        .catch(error => {
            console.error("Error updating session:", error);
        });
    }
  }
  function declineSession(id) { // decline session
    if (window.confirm("Are you sure you want to decline?")) {
        axios.put(`http://localhost:3001/updateSession/${id}`, { status: 2 })
        .then(response => {
            console.log(response.data);
            window.alert("Session Declined");
            fetchData(tutorUID);
        })
        .catch(error => {
            console.error("Error updating session:", error);
        });
    }
  }

  function updateSession(id,sessionHours,maxHours){
    let hoursChange = window.prompt("Enter the number of hours to decrease:");
    hoursChange = Number(hoursChange);

    // Check if the input is a number and within the valid range
    if (isNaN(hoursChange) || hoursChange < 0 || hoursChange > sessionHours) {
        alert("Invalid input. Please enter a number between 0 and " + (sessionHours) + ".");
        return;
    }

    // Calculate the new hoursLeft
    let newHoursLeft = sessionHours - hoursChange;

    // Ensure newHoursLeft is within the valid range
    newHoursLeft = Math.max(0, newHoursLeft);

    if(newHoursLeft === 0){
        let confirmCompletion = window.confirm(`Are you sure to decrease by ${hoursChange} hours? This will complete the session.`);
        if (!confirmCompletion) {
            return;
        }
        axios.put(`http://localhost:3001/updateSession/${id}`, { hoursLeft: newHoursLeft, status: 3 })
        .then(response => {
            fetchData(tutorUID);
        })
        .catch(error => {
            console.error("Error updating session:", error);
        });
    } else {
        axios.put(`http://localhost:3001/updateSession/${id}`, { hoursLeft: newHoursLeft })
        .then(response => {
            fetchData(tutorUID);
        })
        .catch(error => {
            console.error("Error updating session:", error);
        });
    }
}

    function updateSessionPlus(id, sessionHours,maxHours){
        let hoursChange = window.prompt("Enter the number of hours to increase:");
        hoursChange = Number(hoursChange);
    
        // Check if the input is a number and within the valid range
        if (isNaN(hoursChange) || hoursChange < 0 || hoursChange > maxHours - sessionHours) {
            alert("Invalid input. Please enter a number between 0 and " + (maxHours - sessionHours) + ".");
            return;
        }
    
        // Calculate the new hoursLeft
        let newHoursLeft = sessionHours + hoursChange;
    
        // Ensure newHoursLeft is within the valid range
        // newHoursLeft = Math.min(2*sessionHours, newHoursLeft);
    
        axios.put(`http://localhost:3001/updateSession/${id}`, { hoursLeft: newHoursLeft })
        .then(response => {
            fetchData(tutorUID);
        })
        .catch(error => {
            console.error("Error updating session:", error);
        });

    }
    



  return (
    <>
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
                            <a className="active"><span className="fa-solid fa-list-check"></span>
                            <span>My Courses</span></a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/profileTutor')}><span className="fa-solid fa-user"></span>
                            <span>My Account</span></a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/createCourse')}><span className="fa-solid fa-plus"></span>
                            <span>Create A New Course</span></a>
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
                    <div className='user-wrapper-field'>
                        <h4><span><i className='fa-solid fa-user'></i></span> {tutor.name}</h4> 
                        <small>Tutor</small>
                    </div>

                    <button className='logout-btn' onClick={handleLogout}>
                    <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
                    </button>
                </div>

            </header>
        
            <main className='main-flex'>
                <div className="cards">

                    <div className="card-single">
                        <div>
                            <h1>{myCompletedSession.length}</h1>
                            <span>Completed</span>
                        </div>
                        <div>
                            <span className="fa-solid fa-check"></span>
                        </div>
                    </div>



                    <div className="card-single-mid">
                        <div>
                            <h1>{myCurrentSession.length}</h1>
                            <span>in progress</span>
                        </div>
                        <div>
                            <span className="fa-solid fa-fire"></span>
                        </div>
                    </div>

                    <div className="card-single">
                        <div>
                            <h1>{mySession.length}</h1>
                            <span>Total</span>
                        </div>
                        <div>
                            <span className="fa-solid fa-thumbtack"></span>
                        </div>
                    </div>

                </div>

                <div className='main-content-row'>

                    <div className='content-column'>
                
                        <div className="recent-flex">
                            <div className="courses">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>My courses</h3>
                                        {/* <button>See all <span className="fa-solid fa-chevron-down"></span></button> */}
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                        <table width="100%" className="dash">
                                            <thead>
                                                <tr>
                                                    <td>Course title</td>
                                                    <td>Area</td>
                                                    <td>hours</td>
                                                    <td>Total cost</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {courses.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.subject}</td>
                                                            <td>{item.hours}</td>
                                                            <td>{item.cost * item.hours}</td>
                                                            <td><button className='delete-btn' onClick={() => deleteCourse(item._id)}>Delete</button></td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    </div>

                                </div>
                            </div>
                            
                        </div>



                        <div className="recent-flex">
                            <div className="courses">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>Sessions in Progress</h3>
                                        {/* <button>See all <span className="fa-solid fa-chevron-down"></span></button> */}
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table width="100%" className="dash">
                                                <thead>
                                                    <tr>
                                                        <td>Course title</td>
                                                        <td>Area</td>
                                                        <td>Progress</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {mySession.map((item, index) => {
                                                        if(item.status !== 4) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{item.cName}</td>
                                                                    <td>{item.subject}</td> 
                                                                    <td>
                                                                        <i class="fa fa-minus-square fa-lg" aria-hidden="true" onClick={() => {updateSession(item._id, item.hoursLeft, item.hours)}}></i>
                                                                        <div style={{padding: '1rem'}}> 
                                                                            {item.hoursLeft} / {item.hours} hours
                                                                        </div>
                                                                        <i class="fa fa-plus-square fa-lg" aria-hidden="true" onClick={() => {updateSessionPlus(item._id, item.hoursLeft, item.hours)}}></i>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    })}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="recent-flex">
                            <div className="courses">
                                <div className="card">
                                    <div className="card-header">
                                        <h3>Pending Requests</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table width="100%" className="dash">
                                                <thead>
                                                    <tr>
                                                        <td>Course title</td>
                                                        <td>Area</td>
                                                        <td>Status</td>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {session.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.cName}</td>
                                                            <td>{item.subject}</td>
                                                            <td>
                                                                <span className="status"></span>
                                                                <span style={{color: item.status === 1 ? 'green' : item.status === 2 ? 'red' : 'blue'}}>
                                                                {item.status === 0 ? 'Pending' : item.status === 1 ? 'Approved' : item.status === 2 ? 'Declined' : item.status}
                                                                </span>
                                                            </td>
                                                            <td style={{justifyContent: 'center'}}>
                                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                                    {item.status === 0 && <button className="approve" type="button" onClick={() => approveSession(item._id)}>Approve</button>}

                                                                    {item.status === 0 && <button style={{marginLeft: '10%'}} className="decline" type="button" onClick={() => declineSession(item._id)}>Decline</button>}

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                 </div>

                                </div>
                            </div>
                            
                        </div>





                    </div>


                    <div className='recent-completed'>
                        <div className="courses">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Past Sessions</h3>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">

                                        <table width="100%" className="dash">
                                            <thead>
                                                <tr>
                                                    <td>Course title</td>
                                                    <td>Student</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mySession.filter(item => item.hoursLeft === 0).map((item, index) => {
                                                    if(item.status == 4){
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.cName}</td>
                                                                <td>{student.name}</td>
                                                            </tr>
                                                        )
                                                    }

                                                })}

                                            </tbody>
                                        </table>
                                    </div>
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
