import React , { useState } from "react"
import { useNavigate } from 'react-router-dom';

export const Register = (props) => {
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    const handleSwitch = () => {
        navigate('/login');
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register">
                <label htmlFor="name">Full name</label>
                <input value={name} name="name" id="name" placeholder="full name" onChange = {(e) => setName(e.target.value)} type=""/>
                <label htmlFor="email">email</label>
                <input value={email} onChange = {(e) => setEmail(e.target.value)} type=""/>
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="text" />
                <button type="submit">Register</button>
            </form>
            <button className="switch-link-btn" onClick={handleSwitch}>Already have account? Login here.</button>
        </div>
    )
}