import { useState } from "react"
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../authentication/AuthContext"

export const Login = (props) => {
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(email);

        try {
            setError("")
            setLoading(true)
            await login(email, pass)
            navigate('/profile');
        } catch {
            console.log(email)
            console.log(pass)
            setError("Failed to login")
        }
        setLoading(false)
        console.log(email);

    }
    const handleSwitch = () => {
        navigate('/register');
    };

    return (

        <div className="auth-form-container">
            <h2>Login</h2>
            {error && <Alert variant="danger" style={{ border: 'none', backgroundColor: 'transparent', color: 'red', fontWeight:'', fontSize:'1.5rem' }}>{error}</Alert>}
            <form onSubmit={handleSubmit} className="login">
                <label htmlFor = "email">email</label>
                <input value={email} name="email" id="email" type="email" placeholder="youremail@gmail.com" onChange = {(e) => setEmail(e.target.value)}/>
                <label htmlFor = "password">password</label>
                <input value={pass} type="password" placeholder="***********" id="password" name="password" onChange={(e) => setPass(e.target.value)}/>
                
                <button disabled={loading} type="submit">Log In</button>
            </form>
            <button className="switch-link-btn" onClick={handleSwitch}>Don't have an account? Register here.</button>
        </div>
    )
}