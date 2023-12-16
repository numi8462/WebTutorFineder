import React, { useState } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../index.css'

export const Details = (props) => {
    const [student, setStudent] = useState({
        uid: '',
        email: '',
        password: '',
        name: '',
        birthdate: '',
        educationLevel: '',
        subjectOfInterest: [],
        credit: '',
        gender: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("")
            setLoading(true)
            const response = await axios.post('http://localhost:3001/postStudents', student);
            console.log(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to create account!")
        }
        setLoading(false)
    };

    return (
        <div className="wrapper">
        <header className="forms">
            <div className="logo">
                <p>Tutor<span>Finder</span>.</p>
            </div>
        </header>
        <div className="container">
            <div className="form-box">
                <div>
                    <h2>Register</h2>
                </div>
                <div className="enter-info">
                    {error && <Alert variant="danger" style={{ border: 'none', backgroundColor: 'transparent', color: 'red', fontWeight:'', fontSize:'1.5rem' }}>{error}</Alert>}
                    <form onSubmit={handleSubmit} className="register">
                        {/* <label htmlFor="name">full name</label>
                        <input value={name} name="name" id="name" placeholder="full name" onChange = {(e) => setName(e.target.value)} type="name"/> */}
                        <div className='input-group'>
                            <input type="text" name="uid" onChange={handleChange} placeholder="UID" />
                        </div>
                        <div className='input-group'>
                            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
                        </div>
                        <div className='input-group'>
                            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
                        </div>
                        <div className='input-group'>
                            <input type="text" name="name" onChange={handleChange} placeholder="Name" />
                        </div>
                        <div className='input-group'>
                            <input type="date" name="birthdate" onChange={handleChange} placeholder="Birthdate" />
                        </div>
                        <div className='input-group'>
                            <input type="text" name="educationLevel" onChange={handleChange} placeholder="Education Level" />
                        </div>
                        <div className='input-group'>
                            <input type="text" name="subjectOfInterest" onChange={handleChange} placeholder="Subject of Interest" />

                        </div>
                        <div className='input-group'>
                            <input type="number" name="credit" onChange={handleChange} placeholder="Credit" />
                        </div>
                        <div className='input-group'>
                            <input type="text" name="gender" onChange={handleChange} placeholder="Gender" />
                        </div>

                        <div className="buttons">
                            <div className="btn">
                                <button  disabled={loading} type="submit">Register</button>

                            </div>
                        </div>

                    </form>
                </div>
                
            </div>
            
        </div>
    </div>
    );
};


