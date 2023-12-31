import { React,useState, useEffect } from "react";
import { useNavigate } from "react-router";
import firebase from "firebase/compat/app";
import axios from "axios";
import '../dashboard.css'

export const StuDashboard = (props) => {
    const [student, setStudent] = useState({});
    // const { uid } = useParams();
    const [uid, setUid] = useState('')

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
    }, [uid]);

    return (
        
        <body>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>TutorFinder</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            </head>
            <input type="checkbox" id="nav-toggle"/>
            <div className="sidebar">
                <div className="sidebar-brand">
                    <p>Tutor<span>Finder</span>.</p>
                </div>

                <div className="sidebar-menu">
                    <ul>
                        <li>
                            <a href="/studentDashboard" className="active"><span className="fa-solid fa-list-check"></span>
                            <span>My Courses</span></a>
                        </li>
                        <li>
                            <a href="/findcourses"><span className="fa-solid fa-magnifying-glass"></span>
                            <span>Search courses</span></a>
                        </li>
                        <li>
                            <a href=""><span className="fa-solid fa-heart"></span>
                            <span>Saved</span></a>
                        </li>
                        <li>
                            <a href=""><span className="fa-solid fa-user"></span>
                            <span>My Account</span></a>
                        </li>
                    </ul>

                </div>

            </div>

        <div className="main-content">
            <header>
                <div className="header-title">
                    <h1>
                    <label for="nav-toggle">
                        <span className="fa-solid fa-bars"></span>
                    </label>
                    My courses
                    </h1>
                </div>
                <div className="user-wrapper">
                    <div>
                        <h4>John Doe</h4>
                        <small>Student</small>
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
                            <span>in progress</span>
                        </div>
                        <div>
                            <span className="fa-solid fa-fire"></span>
                        </div>
                    </div>

                    <div className="card-single">
                        <div>
                            <h1>5</h1>
                            <span>Totally</span>
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
                                <button>See all <span className="fa-solid fa-chevron-down"></span></button>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                <table width="100%">
                                    <thead>
                                        <tr>
                                            <td>Course title</td>
                                            <td>Area</td>
                                            <td>Status</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href="course_page.html">Spanish laguage</a></td>
                                            <td>Foreign language</td>
                                            <td>
                                                <span className="status"></span>
                                                review
                                            </td>
                                        
                                        </tr>
                                        <tr>
                                            <td><a href="course_page.html">Intro to IT</a></td>
                                            <td>Frontend</td>
                                            <td>
                                                <span className="status"></span>
                                                in progress
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="course_page.html">UI/UX design</a></td>
                                            <td>UI team</td>
                                            <td>
                                                <span className="status"></span>
                                                pending
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
    </body>
    )
}