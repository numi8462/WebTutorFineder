import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (email) => {
        email.preventDefault();
        console.log(email);
        navigate('/profile');
    }
    const handleSwitch = () => {
        navigate('/register');
    };

    return (

        <div className="auth-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login">
                <label for = "email">email</label>
                <input type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <label for = "password">password</label>
                <input type="password" placeholder="***********" id="password" name="password"/>
                <button>Log In</button>
            </form>
            <button className="switch-link-btn" onClick={handleSwitch}>Don't have an account? Register here.</button>
        </div>
    )
}