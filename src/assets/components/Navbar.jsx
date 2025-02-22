import { MdOutlineMenu } from 'react-icons/md';
import { useNavigate, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/loggedInUser')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setUser(data[0]);
                }
            })
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);
    const handleLogoClick = () => navigate('/');

    const handleLogout = async () => {
        if (user) {
            await fetch(`http://localhost:3000/loggedInUser/${user.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            setUser(null);
            navigate('/login');
        }
    };

    const getInitials = (name) => {
        if (!name) return '?';
        const nameParts = name.split(' ');
        return nameParts.map(part => part[0]).join('').toUpperCase();
    };

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="navbar-left">
                <MdOutlineMenu className="toggle-icon" onClick={toggleMenu} />
                <div className="logo" onClick={handleLogoClick} style={{ fontFamily: 'Kanit' }}>
                    <div>SRM</div>
                </div>
            </div>

            <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <ul className="sidebar-links">
                    <li><NavLink to="/dashboard" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>
                    <li><NavLink to="/orders" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Orders</NavLink></li>
                    <li><NavLink to="/admin" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>Admin</NavLink></li>
                    <li><NavLink to="/admin" onClick={handleLogout} className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink></li>
                </ul>
            </div>

            {menuOpen && <div className="overlay" onClick={closeMenu}></div>}

            <div className="navbar-right">
                <ul className="nav-links">
                    <li><NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink></li>
                    <li><NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink></li>
                    <li><NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>Admin</NavLink></li>
                </ul>
                {user ? (
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="dark" className="user-icon" style={{marginRight:"23px", borderRadius:"50%", backgroundColor:"#6a6363",height:"61px",border:"1.5px solid white"}}>
                            {getInitials(user.name)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleLogout} style={{color:"black"}}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <button onClick={() => navigate('/login')} className="btn btn-primary">Login</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
