import { useState, useRef } from "react"
import { Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../authentication/AuthContext"
import '../index.css'

export const ForgotPassword = (props) => {
    // const [email,setEmail] = useState('');
    const emailRef = useRef()
    const navigate = useNavigate();

    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('')
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage('Email Sent! Check your inbox')

        } catch (error) {
            setError(`Failed to reset password`);
            console.error(error);
        }

        setLoading(false);
    }

    const handleSwitch = () => {
        navigate('/login');
    };

    return (
        <div className="wrapper">
            <div className="container">
                <div className="form-box">
                    <div>
                        <h2>Reset Password</h2>

                    </div>
                    <div className="note">
                        <span>Enter your email to reset your password</span>
                    </div>
                    <div className="enter-info">
                    {error && <Alert variant="danger" style={{ border: 'none', backgroundColor: 'transparent', color: 'red', fontWeight:'', fontSize:'1.5rem',marginBottom: '20px' }}>{error}</Alert>}
                    {message && <Alert variant="success" style={{ border: 'none', backgroundColor: 'transparent', color: 'green', fontWeight:'', fontSize:'1.5rem',marginBottom: '20px' }}>{message}</Alert>}
                    <form onSubmit={handleSubmit} className="login">
                        <div className="input-group">
                            <input ame="email" id="email" type="email" placeholder="youremail@gmail.com" ref={emailRef}/>
                        </div>
                        <div className="buttons-register">
                            <div className="btn-register">
                                <button disabled={loading} type="submit">Send Verification</button>
                            </div>

                        </div>
                        <div>
                            <span><a onClick={handleSwitch} className="link" href="">Go back to Login</a></span>
                        </div>
                    </form>
                </div>
                </div>

            </div>
        </div>

    )
}