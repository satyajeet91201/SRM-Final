import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './authentication.css';

function Login({ setIsAuthenticated }) {
    const [emaillog, setEmaillog] = useState('');
    const [passwordlog, setPasswordlog] = useState('');
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const storedEmail = localStorage.getItem('userEmail')?.replace(/"/g, '');
        const storedPassword = localStorage.getItem('userPassword')?.replace(/"/g, '');

        if (!emaillog || !passwordlog || emaillog !== storedEmail || passwordlog !== storedPassword) {
            setFlag(true);
        } else {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/'); // Redirect to Homescreen
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner" style={{marginTop:"-20px"}}>
                <h3>Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={emaillog}
                            onChange={(e) => setEmaillog(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={passwordlog}
                            onChange={(e) => setPasswordlog(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                    {flag && (
                        <Alert variant="danger">
                            Incorrect email or password.
                        </Alert>
                    )}
                    <p className="forgot-password text-right">
                        Don't have an account? <a href="/register">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
