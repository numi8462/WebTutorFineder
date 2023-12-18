import { useState } from "react"
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../authentication/AuthContext"
import '../index.css'

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
        <div className="wrapper">
            <header className="forms">
                <div className="logo">
                    <p>Tutor<span>Finder</span>.</p>
                </div>
            </header>

            <div className="container">
                <div className="form-box">
                    <div>
                        <h2>Login</h2>

                    </div>
                    <div className="enter-info">
                    {error && <Alert variant="danger" style={{ border: 'none', backgroundColor: 'transparent', color: 'red', fontWeight:'', fontSize:'1.5rem' }}>{error}</Alert>}
                    <form onSubmit={handleSubmit} className="login">
                        <div className="input-group">
                            <input value={email} name="email" id="email" type="email" placeholder="youremail@gmail.com" onChange = {(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-group">
                            <input value={pass} type="password" placeholder="***********" id="password" name="password" onChange={(e) => setPass(e.target.value)}/>
                        </div>
                        <div className="buttons">
                            <div className="btn">
                                <button disabled={loading} type="submit">Log In</button>
                            </div>

                        </div>
                        <div>
                            <span>New user? <a onClick={handleSwitch} className="link" href="">Sign up as Student</a> or <a className="link" href="">Sign up as Tutor</a></span>
                        </div>
                    </form>
                </div>
                </div>

            </div>
        </div>

    )
}