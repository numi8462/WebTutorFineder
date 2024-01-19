import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authentication/AuthContext';
import firebase from "firebase/compat/app";
import axios from 'axios';
import '../../index.css';
import courseImg from '../../homepage-frontend/images/default.jpg';

export const Course = ({ course, student }) => {
    const [tutor, setTutor] = useState(null);
    // const [student, setStudent] = useState({});
    const navigate = useNavigate();
    const [uid, setUid] = useState('');

    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       setUid(user.uid);
    //       console.log("uid: ", uid)
    //     }
    //   });

    useEffect(() => {
        // Fetch the tutor's data
        axios.get(`http://localhost:3001/getTutors/${course.tutorID}`)
        .then(res => {
            setTutor(res.data);
        });
        

    }, [course.tutorID]);

    if (!tutor) {
        return <tr>Loading...</tr>;
    }

    return (
            <tr className="tut-matching-container">
                <td className="left-td">
                    <img src={courseImg} alt="post" /> 
                </td>
                <td className="matching-td">
                    <h4><i className='fa-solid fa-user'></i> {tutor.name}</h4>
                    <h4>{tutor.qualification} of {tutor.major}</h4>
                    <h4>{tutor.uni}</h4>
                    {tutor && student && tutor.uni === student.uni && <h4 className="status">Fellow Alumni</h4>}
                </td>
                <td className="right-td">
                    <table>
                        <tr>
                            <h4>{course.name}</h4>
                        </tr>
                        <tr>
                            <p>{course.description}</p>
                            <button type="button" className="read-btn" onClick={() => navigate(`/course/${course._id}`)}>Details</button>
                        </tr>
                    </table>
                    
                </td>
            </tr>
    );
};

export default Course;