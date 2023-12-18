import axios from 'axios';
import React, { useState, useEffect  } from "react";
import { useAuth } from '../../authentication/AuthContext'
import firebase from "firebase/compat/app";
import { useNavigate } from 'react-router-dom';

export const FindCourses = (props) => {
    const [uid, setUid] = useState('')
    const [course, setCourses] = useState([])
    const { currentUser } = useAuth()
    const navigate = useNavigate();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    
    useEffect(() => {
      axios.get(`http://localhost:3001/getCourses`)
        .then(response => {
          console.log(response.data); // Log the response data
          setCourses(response.data);
        }).catch(err => console.log(err));
    }, []); // Dependency array
    

    return (
        <div>
            <table className="table">
              <thead>
                  <tr>
                      <th>Course Name</th>
                      <th>Subject</th>
                      <th>Hours</th>
                  </tr>
              </thead>
              <tbody>
              {course.map((item, index) => (
                  <tr key={index} onClick={() => navigate(`/course/${item.cid}`)}>
                      <td>{item.name}</td>
                      <td>{item.subject}</td>
                      <td>{item.hours}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        </div>
    )
}

