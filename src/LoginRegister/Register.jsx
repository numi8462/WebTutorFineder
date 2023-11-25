import React , { useState } from "react"

export const Register = (props) => {
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register">
                <label htmlFor="name">Full name</label>
                <input value={name} name="name" id="name" placeholder="full name"/>
                <label htmlFor="email">email</label>
                <input value={email} onChange = {(e) => setEmail(e.target.value)} type=""/>
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="text" />
                <button type="submit">Register</button>
            </form>
            <button className="switch-link-btn" onClick={() => props.onSwitch('login')}>Already have account? Login here.</button>
        </div>
    )
}