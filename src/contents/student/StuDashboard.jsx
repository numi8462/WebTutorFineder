import { React,useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from '../../authentication/AuthContext'
import firebase from "firebase/compat/app";
import axios from "axios";
import '../dashboard.css'

export const StuDashboard = (props) => {
    const [student, setStudent] = useState({});
    const [tutor, setTutor] = useState({});
    const [session, setSession] = useState([]);
    const [mySession, setMySession] = useState([]);
    const [myCompletedSession, setMyCompletedSession] = useState([]);
    const [myCurrentSession, setMyCurrentSession] = useState([]);
    // const { uid } = useParams();
    const [uid, setUid] = useState('')
    const { logout } = useAuth();
    const navigate = useNavigate();

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
        fetchData();
    }, [uid]);

    useEffect(() => {
        mySession.filter(item => item.hoursLeft === 0).forEach(item => {
            fetchTutorData(item.tid);
        });
    }, [mySession]);

    function fetchTutorData(id) {
        axios.get(`https://tutorfinder-api.onrender.com/getTutors/${id}`)
        .then((res) => {
            setTutor(res.data)
            return res.data
        })
    }

    // Function to call data
    function fetchData() {
        axios.get(`https://tutorfinder-api.onrender.com/profile/${uid}`)
        .then((response) => {
            setStudent(response.data);
            console.log(response.data)
            console.log("name: ",student.name)
            return axios.get(`https://tutorfinder-api.onrender.com/getSessions`);
        })
        .then((response) => {
            const filteredSessions = response.data.filter(session => session.sid === uid && session.isConfirmed === false);
            setSession(filteredSessions);
            // console.log(filteredSessions);
    
            // Filter for session.isConfirmed is true
            const confirmedSessions = response.data.filter(session => session.sid === uid && session.isConfirmed === true);
            setMySession(confirmedSessions);  // Set mySession with the result
            // console.log(confirmedSessions);

            const completedSessions = response.data.filter(session => session.sid === uid && session.isConfirmed === true && session.status === 4);
            setMyCompletedSession(completedSessions);
    
            const currentSessions = response.data.filter(session => session.sid === uid && session.isConfirmed === true && (session.status === 1 || session.status === 3));
            setMyCurrentSession(currentSessions);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    // Function to update the session
    function updateSession(id) {
        axios.put(`https://tutorfinder-api.onrender.com/updateSession/${id}`, { isConfirmed: true })
        .then(response => {
            console.log(response.data);
            window.alert("Session updated successfully!");
            fetchData();
        })
        .catch(error => {
            console.error("Error updating session:", error);
        });
    }

    // Function to delete the session
    function deleteSession(id) {
        axios.delete(`https://tutorfinder-api.onrender.com/deleteSession/${id}`)
        .then(response => {
            console.log(response.data);
            window.alert("Session deleted successfully!");
            fetchData();
        })
        .catch(error => {
            console.error("Error deleting session:", error);
        });
    }

    function complete(id) { // approve session
        axios.put(`https://tutorfinder-api.onrender.com/updateSession/${id}`, { status: 4 })
        .then(response => {
            console.log(response.data);
            window.alert("Course Completed");
            fetchData();
        })
        .catch(error => {
            console.error("Error updating session:", error);
        });
      }

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
                            <a className="active"><span className="fa-solid fa-list-check"></span>
                            <span>My Courses</span></a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/findcourses')}><span className="fa-solid fa-magnifying-glass"></span>
                            <span>Search courses</span></a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/matching')}><span className="fa-solid fa-heart"></span>
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
                    My courses
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
                                        <h3>Your current courses</h3>
                                        {/* <button>See all <span className="fa-solid fa-chevron-down"></span></button> */}
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                        <table width="100%" className="dash">
                                            <thead>
                                                <tr>
                                                    <td>Course title</td>
                                                    <td>Area</td>
                                                    <td>Status</td>
                                                    <td>Progress</td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mySession.map((item, index) => {
                                                    if(item.status != 4){
                                                        return(
                                                            <tr key={index}>
                                                                <td>{item.cName}</td>
                                                                <td>{item.subject}</td>
                                                                <td>
                                                                    <span className="status"></span>
                                                                    <span style={{color: item.status === 1 ? 'green' : item.status === 2 ? 'red' : 'blue'}}>
                                                                    {item.status === 0 ? 'Pending' : item.status === 1 ? 'Approved' : item.status === 2 ? 'Declined' : item.status === 3 ? 'Completed' : item.status}
                                                                    </span>
                                                                </td>
                                                                <td>{item.hoursLeft} / {item.hours} hours </td>
                                                                {item.status === 3 && <td><button className="complete-btn" onClick={() => complete(item._id)}>Complete</button></td>}
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
                                            <tbody>
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
                                                        <td>
                                                            <div className="">
                                                                {item.status === 1 && <button className="confirm" type="button" onClick={() => updateSession(item._id)}>Confirm</button>}
                                                                {item.status === 2 && <button className="confirm" type="button" onClick={() => deleteSession(item._id)}>Confirm</button>}
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
                                                    <td>Tutor</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mySession.filter(item => item.hoursLeft === 0).map((item, index) => {
                                                    if(item.status == 4){
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.cName}</td>
                                                                <td>{tutor.name}</td>
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
    )
}