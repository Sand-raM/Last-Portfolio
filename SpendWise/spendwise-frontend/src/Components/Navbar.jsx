import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  // Check if the user is authenticated
  const token = localStorage.getItem('token');
  const isAuthenticated = token !== null;

  return (
    <nav className="navbar" aria-label="Main Navigation">
      {/* Navigation bar title */}
      <h1 className="navbar-title">SpendWise</h1>

      {/* Navigation links */}
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard" className="navbar-link" aria-current="page">Dashboard</Link>
            </li>
            <li>
              <Link to="/expenses" className="navbar-link">Expenses</Link>
            </li>
            <li>
              <Link to="/budget" className="navbar-link">Budget</Link>
            </li>
            {/* Logout link or button */}
            <li>
              <Link to="/logout" className="navbar-link">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="navbar-link">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
