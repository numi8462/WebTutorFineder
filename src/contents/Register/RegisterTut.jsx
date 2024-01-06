import React , { useState } from "react";
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../authentication/AuthContext';
import '../../index.css'
import axios from 'axios';
import Select from 'react-select';

export const RegisterTut = (props) => {
    const [email,setEmail] = useState(''); 
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('')
    const navigate = useNavigate();

    const [tutor, setTutor] = useState({
        uid: '',
        email: '',
        password: '',
        name: '',
        birthdate: '',
        qualification: '',
        subjects: [],
        credit: 0,
        gender: '',
        user: 'tutor'
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
        setTutor({ ...tutor, [e.target.name]: e.target.value });
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

                const updatedTutor = {
                    ...tutor,
                    uid: uid,
                    email: email,
                    password: pass,
                };

                try {
                    const response = await axios.post('http://localhost:3001/postTutor', updatedTutor);
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
        navigate('/login');
    };
    
    

    const handleSwitch = () => {
        navigate('/login');
    };


    return (
        <div className="wrapper">
            <div className="container">
                <div className="form-box">
                    <div>
                        <h2>Register as Tutor</h2>
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
                                <select name="qualification" onChange={handleChange}>
                                    <option value="">Qualification</option>
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="masters">Master's Degree</option>
                                    <option value="doctorate">Doctorate's Degree</option>
                                    <option value="teaching degree">Teaching Degree</option>
                                </select>
                            </div>
                            <div className='input-group'>
                                <select name="gender" onChange={handleChange}>
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="buttons-register">
                                <div className="btn-register">
                                    <button  disabled={loading} type="submit">Register</button>

                                </div>
                            </div>

                        </form>
                    </div>


                    
                    <div className="register-bottom">
                        <span> Already have account?</span>
                        <a className="link" onClick={handleSwitch}>Login here.</a>
                    </div>
                    
                </div>
                
            </div>
        </div>

    )
}