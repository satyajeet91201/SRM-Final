import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import "./authentication.css";

function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [flag, setFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setFlag(true);
            setErrorMessage("Please fill in all fields.");
            return;
        }

        try {
            // Check if user already exists
            const { data: users } = await axios.get("http://localhost:3000/users");
            const userExists = users.some((user) => user.email === email);

            if (userExists) {
                setFlag(true);
                setErrorMessage("User already exists. Please login.");
            } else {
                // Register new user
                await axios.post("http://localhost:3000/users", { name, email, password });
                setFlag(false);
                navigate("/login");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            setFlag(true);
            setErrorMessage("Error registering user. Try again.");
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
                    {flag && <Alert variant="danger">{errorMessage}</Alert>}
                    <p className="forgot-password text-right">
                        Already registered? <NavLink to="/login">Log in</NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Registration;
