import { useState } from "react"
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../authentication/AuthContext"
import '../index.css'
import logoImg from '../homepage-frontend/images/logo.png'


export const Login = (props) => {
    const [email,setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            const userCredential = await login(email, pass); // Assuming login returns userCredential
            const uid = userCredential.user.uid; // Get uid from userCredential
            console.log(uid)
            // Fetch user by uid
            const response = await fetch(`https://tutorfinder-api.onrender.com/getUser/${uid}`);
            const data = await response.json();
            console.log("role is: "+data.role)
            // Navigate based on user's role
            if (data.role === 'student') {
                navigate('/studentDashboard');
            } else if (data.role === 'tutor') {
                navigate('/tutorDashboard');
            } else {
                setError("Failed to determine user role");
            }

        } catch (error) {
            setError(`Failed to login: ${error.message}`);
            console.error(error);
        }

        setLoading(false);
    }

    const handleSwitch = () => {
        navigate('/register');
    };
    const handleSwitchTut = () => {
        navigate('/registerTutor');
    };

    return (
        <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>TutorFinder</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link href="../index.css" rel="stylesheet" type="text/css" />
        
        <div className="wrapper">

            <div className="container-register">
                <div className="main-logo">
                    <a onClick={() => navigate('/homepage')}>
                    <div className="sidebar-brand" id='brand-logo'>
                        <p>Tutor<span>Finder</span>.</p>
                    </div>
                    </a>
                </div>
                <div className="form-box">
                    
                    <div>
                        <h2>Login</h2>
                    </div>
                    <div className="enter-info" >
                    {error && <Alert variant="danger" style={{ border: 'none', backgroundColor: 'transparent', color: 'red', fontWeight:'', fontSize:'1.5rem' }}>{error}</Alert>}
                    <form onSubmit={handleSubmit} className="login">
                        <div className="input-group">
                            {/* <p>Email</p> */}
                            <i class="fa fa-user"></i>
                            <input value={email} name="email" id="email" type="email" placeholder="youremail@gmail.com" onChange = {(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-group">
                            {/* <p>Password</p> */}
                            <i class="fa fa-lock"></i>
                            <input value={pass} type="password" placeholder="***********" id="password" name="password" onChange={(e) => setPass(e.target.value)}/>
                        </div>
                        <div className="reset">
                            <a classNamehref="link" href="/forgotpassword"> Forgot password</a>
                        </div>
                        <div className="buttons-register">
                            <div className="btn-register">
                                <button disabled={loading} type="submit">Log In</button>
                            </div>

                        </div>
                        <div className="bottom-links">
                            <span>New user?</span> 
                            <div className="q-links">
                                <a onClick={handleSwitch} className="link" href="">Sign up as Student</a> 
                                <a onClick={handleSwitchTut} className="link" href="">Sign up as Tutor</a>
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