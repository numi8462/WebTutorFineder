import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'

const TutorFinder = () => {





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
                        <h1>Details</h1>
                    </div>
                    <div className="enter-info">
                        <div className="input-group">
                            <input type="text" placeholder="Enter your username" />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Enter your email" />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Enter your password" />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Confirm your password" />
                        </div>
                    </div>

                    <div className="buttons">
                        <div className="btn">
                            <button type="submit">Sign up</button>
                        </div>
                    </div>
                    <div>
                        <span>Already a member? <a className="link" href="log_in_page.html">Log in!</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TutorFinder;
