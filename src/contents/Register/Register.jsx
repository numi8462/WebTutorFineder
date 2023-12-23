import React , { useState } from "react";
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../authentication/AuthContext';
import '../../index.css'
import axios from 'axios';
import Select from 'react-select';

export const Register = (props) => {
    const [email,setEmail] = useState(''); 
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('')
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        uid: '',
        email: '',
        password: '',
        name: '',
        birthdate: '',
        educationLevel: '',
        subjectOfInterest: [],
        credit: 100,
        gender: '',
        user: 'student'
    });

    const options = [
        { value: 'math', label: 'Math' },
        { value: 'science', label: 'Science' },
        { value: 'history', label: 'History' },
        { value: 'art', label: 'Art' },
        { value: 'music', label: 'Music' },
        { value: 'it', label: 'IT' },
        { value: 'design', label: 'Design' },
      ];
      
    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( pass !== passConf ){
            return setError("Password does not match!")
        } 
        try {
            setError("");
            setLoading(true);
            const uid = await signUp(email, pass);
            if (uid) {
                setId(uid);
                setEmail(email);
                setPass(pass);
                console.log(uid);  // Prints the uid of the newly created user

                const updatedStudent = {
                    ...student,
                    uid: uid,
                    email: email,
                    password: pass,
                };

                try {
                    const response = await axios.post('http://localhost:3001/postStudents', updatedStudent);
                    console.log(response.data);
                } catch (err) {
                    console.error(err);
                    setError("Failed to post student data!")
                }
            } else {
                console.log('No uid returned from signUp');
            }
        } catch (err) {
            console.error(err);
            setError("Failed to create account!")
        }
        setLoading(false);
        navigate('/studentDashboard');
    };
    
    

    const handleSwitch = () => {
        navigate('/login');
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
                            <div className="input-group">
                                <input value={email} name="email" id="email" placeholder="Enter your email" onChange = {(e) => setEmail(e.target.value)} type="email"/>
                            </div>
                            <div className="input-group">
                                <input value={pass} name="password" id="password" placeholder="Enter your password" onChange={(e) => setPass(e.target.value)} type="password" />
                            </div>
                            <div className="input-group">
                                <input value={passConf} name="passwordConf" id="passwordConf" placeholder="********" onChange={(e) => setPassConf(e.target.value)} type="password" />
                            </div>
                            <div className='input-group'>
                                <input type="text" name="name" onChange={handleChange} placeholder="Name" />
                            </div>
                            <div className='input-group'>
                                <input type="date" name="birthdate" onChange={handleChange} placeholder="Birthdate" />
                            </div>
                            <div className='input-group'>
                                <select name="educationLevel" onChange={handleChange}>
                                    <option value="">Education Level</option>
                                    <option value="highSchool">High School</option>
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="masters">Master's Degree</option>
                                    <option value="doctorate">Doctorate</option>
                                </select>
                            </div>

                            <Select
                            isMulti
                            name="subjectOfInterest"
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={selectedOptions => {
                                // Update state
                                setStudent(prevState => ({
                                ...prevState,
                                subjectOfInterest: selectedOptions.map(option => option.value),
                                }));
                            }}
                            />

                            <div className='input-group'>
                                <select name="gender" onChange={handleChange}>
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="buttons">
                                <div className="btn">
                                    <button  disabled={loading} type="submit">Register</button>

                                </div>
                            </div>

                        </form>
                    </div>


                    
                    <div>
                        <span> Already have account?  <a className="link" onClick={handleSwitch}>Login here.</a> </span>
                    </div>
                    
                </div>
                
            </div>
        </div>

    )
}