import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './authentication.css';

function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setFlag(true);
        } else {
            setFlag(false);
            localStorage.setItem('userEmail', JSON.stringify(email));
            localStorage.setItem('userPassword', JSON.stringify(password));
            navigate('/login'); // Redirect to login
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <h3>Register</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    {flag && (
                        <Alert variant="danger">
                            Please fill in all fields.
                        </Alert>
                    )}
                    <p className="forgot-password text-right">
                        Already registered? <a href="/login">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );s
}

export default Registration;

