import React , { useState, useEffect } from "react";
import Papa from 'papaparse';
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../authentication/AuthContext';
import '../../index.css'
import axios from 'axios';
import Select from 'react-select';
import majorData from '../text/majors.txt'
import uni from '../text/world-universities.csv'
import logoImg from '../../homepage-frontend/images/logo.png'

export const Register = (props) => {
    const [email,setEmail] = useState(''); 
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('')
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const [majors, setMajors] = useState([]);
    const [uniList, setUniList] = useState([])
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
        user: 'student',
        uni: '',
        major: '',
    });

    useEffect(() => {
        fetch(majorData)
            .then(response => response.text())
            .then(data => {
                const majors = data.split('\n');
                setMajors(majors); // Set the majors directly
            });
        fetch(uni)
            .then(response => response.text())
            .then(data => {
                const results = Papa.parse(data, { header: false });
                const universities = results.data.map(row => row[1]);
                setUniList(universities);
      });
    }, []);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };
    const handleMajorChange = (selectedOption) => {
        // console.log('Option selected:', selectedOption);
        setStudent(prevStudent => ({ ...prevStudent, major: selectedOption ? selectedOption.value : '' }));
    };

    const handleUniChange = (selectedOption) => {
        console.log('University selected:', selectedOption);
        setStudent(prevStudent => ({ ...prevStudent, uni: selectedOption ? selectedOption.value : '' }));
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
        navigate('/login');
    };
    
    

    const handleSwitch = () => {
        navigate('/login');
    };


    return (
        <div className="wrapper">
            <div className="container-register">
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

                            {/* <div className='input-group'>
                                <select name="major" onChange={handleChange}>
                                    <option value="">Major</option>
                                    <option value="it">IT</option>
                                    <option value="design">Design</option>
                                </select>
                            </div> */}
                            <div className='input-group'>
                                <select name="gender" onChange={handleChange}>
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className='input-select'>
                                <Select
                                name="uni"
                                options={uniList.map(item => ({ value: item ? item.toLowerCase() : '', label: item ? item : '' }))}                                
                                onChange={handleUniChange}
                                placeholder="Choose University"
                                isClearable={true}
                                isSearchable={true}
                                />
                            </div>
                            <div className='input-select'>
                                <Select
                                    name="major"
                                    options={majors.map(item => ({ value: item.toLowerCase(), label: item }))}
                                    onChange={handleMajorChange}
                                    placeholder="Choose Your Major"
                                    isClearable={true}
                                    isSearchable={true}
                                />
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
                        <a className="link" onClick={handleSwitch}>Login here</a> 
                    </div>
                    
                </div>
                
            </div>
        </div>

    )
}