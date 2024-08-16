import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">SpendWise</h1>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/expenses">Expenses</Link></li>
        <li><Link to="/budget">Budget</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
