import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";

function Login({ setIsAuthenticated }) {
    const [emaillog, setEmaillog] = useState("");
    const [passwordlog, setPasswordlog] = useState("");
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/users");
            const users = await response.json();
            const foundUser = users.find(user => user.email === emaillog && user.password === passwordlog);

            if (!foundUser) {
                setFlag(true);
                return;
            }

            // Remove all previously logged-in users
            await fetch("http://localhost:3000/loggedInUser", {
                method: "DELETE",
            });

            // Add only the new logged-in user
            await fetch("http://localhost:3000/loggedInUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: foundUser.id,
                    email: foundUser.email,
                    name: foundUser.name,
                }),
            });

            setIsAuthenticated(true);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner" style={{ marginTop: "-20px" }}>
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
                        <Alert variant="danger" style={{marginTop:"5px"}}>
                            Incorrect email or password.
                        </Alert>
                    )}
                    <p className="forgot-password text-right">
                        Don't have an account? <NavLink to="/register">Sign up</NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
