import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Assuming styles are in Navbar.css

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogoClick = () => navigate("/");

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Menu Toggle Icon */}
        <MdOutlineMenu className="toggle-icon" onClick={toggleMenu} />
        <div className="logo" onClick={handleLogoClick} style={{fontFamily:"Kanit"}}>
          <div>SRM</div>
        </div>
      </div>
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`} >
        <ul className="sidebar-links">
          <li>
            <a href="/dashboard" style={{fontFamily:"sans-serif"}}>Dashboard</a>
          </li>
          <li>
            <a href="#" style={{fontFamily:"sans-serif"}}>Orders</a>
          </li>
          <li>
            <a href="/admin" style={{fontFamily:"sans-serif"}}>Admin</a>
          </li>
        </ul>
      </div>
      {/* Desktop Navbar Items */}
      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/admin">Admin</a>
          </li>
        </ul>
      </div>
      {/* Overlay for Sidebar */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Navbar;


