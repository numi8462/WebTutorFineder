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
            navigate('/studentDashboard');
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
        <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>TutorFinder</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link href="../index.css" rel="stylesheet" type="text/css" />
        <div className="wrapper">
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
                        <div className="bottom-links">
                            <span>New user?</span> 
                            <div className="q-links">
                                <a onClick={handleSwitch} className="link" href="">Sign up as Student</a> 
                                <a className="link" href="">Sign up as Tutor</a>
                            </div>
                        </div>
                    </form>
                </div>
                </div>

            </div>
        </div>
        </div>
    )
}