import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../../authentication/AuthContext"
import firebase from "firebase/compat/app";
import axios from 'axios';
import '../../index.css';
import { useNavigate } from "react-router-dom";

export const TutProfile = (props) => {
  const [tutor, setTutor] = useState({});
  const { logout } = useAuth();

  const navigate = useNavigate();

  // const { uid } = useParams();
  const [uid, setUid] = useState('')

  const handleLogout = async () => {
    try {
        await logout();
        navigate('/login');  // Navigate to /login
    } catch (error) {
        console.error('Failed to log out', error);
    }
  };

  useEffect(() => {
  
    const handleAuthStateChange = (user) => {
      if (user) {
        setUid(user.uid);
        fetchData(user.uid); // Fetch student data when user logs in
      }
    };

    const authUnsubscribe = firebase.auth().onAuthStateChanged(handleAuthStateChange);

    return () => {
      // Cleanup the auth state subscription
      authUnsubscribe();
    };
  }, [uid]);

  const fetchData = async (uid) => {
    try {
      const response = await axios.get(`http://localhost:3001/getTutors/${uid}`);
      setTutor(response.data);

    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
  }

  const updateTutorInfo = async (updatedData) => {
    try {
      await axios.put(`http://localhost:3001/updateTutor/${uid}`, updatedData);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const handleInputChange = (field, value) => {
 
    setTutor((prevTutor) => ({
      ...prevTutor,
      [field]: value,
    }));
    
  };

  const handleUpdateClick = async () => {
    const updatedData = {
      name: tutor.name,
      email: tutor.email,
      gender: tutor.gender,
      birthdate: tutor.birthdate,
    };

    try {
      await updateTutorInfo(updatedData);
      alert('Profile updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile data:", error);
      toast.error('Error updating profile');
    }
  };
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
                            <a onClick={() => navigate('/tutorDashboard')}><span className="fa-solid fa-list-check"></span>
                            <span>My Courses</span></a>
                        </li>
                        <li>
                            <a className="active"><span className="fa-solid fa-user"></span>
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
                    My account
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
        
            <main className='main'>
        <form onSubmit={handleFormSubmit}>
          <div className="upper">
          <div className="change-info">
            <div className="change-info-inside">
              {/* <div className="p-pic-container">
                <p>Edit profile picture</p>
              </div> */}
              <div className="left-info">
                <div className="head">Your Tutor Profile</div>
                <div className="stable">Name</div>

                <div className="input-group">
                  <input
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    value={tutor.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="stable">Email</div>
                <div className="input-group">
                  <input
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={tutor.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="stable">Date of birth</div>
                  <div className="changed">
                    <input
                      type="date"
                      name="birthdate"
                      placeholder="yyyy-mm-dd"
                      value={tutor.birthdate}
                      min="1950-01-01"
                      max="2030-12-31"
                      onChange={(e) => handleInputChange("birthdate", e.target.value)}
                    />
                  </div>
              </div>
                
              <div className="right-info">
                <div className="stable gender">Gender</div>
                  <div className='option'>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={tutor.gender === "male"}
                      onChange={() => handleInputChange("gender", "male")}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className='option'>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={tutor.gender === "female"}
                      onChange={() => handleInputChange("gender", "female")}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div className='option'>
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      checked={tutor.gender === "other"}
                      onChange={() => handleInputChange("gender", "other")}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
              </div>
              <div className="end-info">
                <button className="update-btn" type='onSubmit' onClick={handleUpdateClick}>
                  Update Profile
                </button>
              </div>

            </div>
            
          </div>
          
        </div>
      </form>
      <div className="web-info">
        <div className="div-29">
          <div className="div-30">
            <div className="div-31">Your Tutor info</div>
            <div className="stable"><h4>My University</h4></div>
            <div className="changed">{tutor.uni}</div>
            <div className="stable"><h4>Qaulification</h4></div>
            <div className="changed">{tutor.qualification}</div>
          </div>
          <div className="div-34">
            <div className="stable"><h4>Major</h4></div>
            <div className="changed">{tutor.major}</div>
          </div>
        </div>
      </div>

            </main>
        </div>
    </div>
  );
};