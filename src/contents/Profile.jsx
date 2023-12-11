import axios from 'axios';
import React, { useState, useEffect  } from "react";
import { useAuth } from '../authentication/AuthContext'
import firebase from "firebase/compat/app";

function Profile() {
    const [email,setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [uid, setUid] = useState('')
    const [student, setStudent] = useState([])
    const { currentUser } = useAuth()

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    
    useEffect(() => {
      if (uid) {
        axios.get(`http://localhost:3001/getStudents/${uid}`)
          .then(response => {
            console.log(response.data); // Log the response data
            setStudent(response.data);
          }).catch(err => console.log(err));
      }
    }, [uid]); // Dependency array
    

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>birthdate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.birthdate}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Profile; 