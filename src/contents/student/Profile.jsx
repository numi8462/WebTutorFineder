import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import firebase from "firebase/compat/app";
import axios from 'axios';
import '../../index.css';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

export const Profile = (props) => {
  const [student, setStudent] = useState({});
  const [tutor, setTutor] = useState({});
  const navigate = useNavigate();

  // const { uid } = useParams();
  const [uid, setUid] = useState('')

  const options = [
    { value: 'Creative Arts and Design', label: 'Creative Arts and Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Business and Management', label: 'Business and Management' },
    { value: 'IT', label: 'IT' },
    { value: 'Software Development', label: 'Software Development' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Law', label: 'Law' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${uid}`);
        setStudent(response.data);

      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const handleAuthStateChange = (user) => {
      if (user) {
        setUid(user.uid);
        fetchData(); // Fetch student data when user logs in
      }
    };

    const authUnsubscribe = firebase.auth().onAuthStateChanged(handleAuthStateChange);

    return () => {
      // Cleanup the auth state subscription
      authUnsubscribe();
    };
  }, [uid]);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
  }

  const updateStudentInfo = async (updatedData) => {
    try {
      await axios.put(`http://localhost:3001/update/${uid}`, updatedData);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'subjectOfInterest') {
      setStudent((prevStudent) => ({
        ...prevStudent,
        [field]: value.map(option => option.value),
      }));
    } else {
      setStudent((prevStudent) => ({
        ...prevStudent,
        [field]: value,
      }));
    }
  };

  const handleUpdateClick = async () => {
    const updatedData = {
      name: student.name,
      email: student.email,
      gender: student.gender,
      birthdate: student.birthdate,
      subjectOfInterest: student.subjectOfInterest,
    }
    try {
      await updateStudentInfo(updatedData);
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
                            <a onClick={() => navigate('/studentDashboard')}><span className="fa-solid fa-list-check"></span>
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
                            <a className="active" href=""><span className="fa-solid fa-user"></span>
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
                    My account
                    </h1>
                </div>
                <div className="user-wrapper">
                  <div className='user-wrapper-field'>
                    <h4><span><i className='fa-solid fa-user'></i></span> {student.name}</h4> 
                    <small>Student</small>
                  </div>
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
                <div className="head">Your Student Profile</div>
                <div className="stable">Name</div>

                <div className="input-group">
                  <input
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    value={student.name}
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
                    value={student.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="stable">Date of birth</div>
                  <div className="changed">
                    <input
                      type="date"
                      name="birthdate"
                      placeholder="yyyy-mm-dd"
                      value={student.birthdate}
                      min="1950-01-01"
                      max="2030-12-31"
                      onChange={(e) => handleInputChange("birthdate", e.target.value)}
                    />
                  </div>
              </div>
                
              <div className="right-info">
              <div className="stable gender">Subject of Interest</div>
              <div className="input-group">
              <Select
                isMulti
                name="subjectOfInterest"
                options={options}
                className="basic-multi-select select-fixed-size"
                classNamePrefix="select"
                onChange={(selectedOptions) => handleInputChange("subjectOfInterest", selectedOptions)}
                value={student.subjectOfInterest ? student.subjectOfInterest.map(subject => ({ value: subject, label: subject })) : []}
              />
              </div>
                <div className="stable gender">Gender</div>
                  <div className='option'>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={student.gender === "male"}
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
                      checked={student.gender === "female"}
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
                      checked={student.gender === "other"}
                      onChange={() => handleInputChange("gender", "other")}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
              </div>
              <div className="end-info">
                <button className="btn" type='onSubmit' onClick={handleUpdateClick}>
                  Update your info
                </button>
              </div>

            </div>
            
          </div>
          
        </div>
      </form>
      <div className="web-info">
        <div className="div-29">
          <div className="div-30">
            <div className="div-31">Your info</div>
            <div className="stable"><h4>University</h4></div>
            <div className="changed">{student.uni}</div>
            <div className="stable"><h4>Education Level</h4></div>
            <div className="changed">{student.educationLevel}</div>
          </div>
          <div className="div-34">
            <div className="stable"><h4>Major</h4></div>
            <div className="changed">{student.major}</div>
            <div className="stable"><h4>Subject of Interest</h4></div>
            <div className="changed">{student.subjectOfInterest}</div>
          </div>
        </div>
        <div className="stable"><h4>Credit</h4></div>
        <div className="changed">$ {student.credit}</div>
      </div>

            </main>
        </div>
    </div>
  );
};