import { useState } from "react"

export const Login = (props) => {
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (email) => {
        email.preventDefault();
        console.log(email);
    }

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
            <button className="switch-link-btn" onClick={() => props.onSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}