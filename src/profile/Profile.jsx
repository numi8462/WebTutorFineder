import axios from 'axios';
import React, { useState, useEffect  } from "react";

function Profile() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // axios.get("http://localhost:3001/getStudents")
        // .then(students => setStudents(students.data))
        // .then(console.log("fetched data"))
        // .catch(err => console.log(err))
        axios.get("http://localhost:3001/getStudents")
        .then(response => {
        console.log(response.data); // Log the response data
        setStudents(response.data);
        }).catch(err => console.log(err));
    }, [])
    
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
                    {
                        students.map((student, index) => {
                            return (
                              <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.birthdate}</td>
                              </tr>
                            );
                          })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Profile; 