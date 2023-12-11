import React , { useState } from "react";
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../authentication/AuthContext';
import '../index.css'

export const Register = (props) => {
    const [email,setEmail] = useState(''); 
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [passConf, setPassConf] = useState('');
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(email);

        if( pass !== passConf ){
            return setError("Password does not match!")
        } 
        try {
            setError("")
            setLoading(true)
            await signUp(email, pass)
            
        } catch {
            
            setError("Failed to create account!")
        }
        setLoading(false)

    }
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
                            {/* <label htmlFor="name">full name</label>
                            <input value={name} name="name" id="name" placeholder="full name" onChange = {(e) => setName(e.target.value)} type="name"/> */}
                            <div className="input-group">
                                <input value={email} name="email" id="email" placeholder="Enter your email" onChange = {(e) => setEmail(e.target.value)} type="email"/>
                            </div>
                            <div className="input-group">
                                <input value={pass} name="password" id="password" placeholder="Enter your password" onChange={(e) => setPass(e.target.value)} type="password" />
                            </div>
                            <div className="input-group">
                                <input value={passConf} name="passwordConf" id="passwordConf" placeholder="********" onChange={(e) => setPassConf(e.target.value)} type="password" />
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