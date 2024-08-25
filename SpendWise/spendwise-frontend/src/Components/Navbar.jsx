import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  // Check if the user is authenticated
  const token = localStorage.getItem('token');
  const isAuthenticated = token !== null;

  // Use navigate hook to programmatically navigate
  const navigate = useNavigate();

  // Get current pathname for setting active link
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      {/* Navigation bar title */}
      <h1 className="navbar-title">SpendWise</h1>

      {/* Navigation links */}
      <ul className="navbar-links">
        {isAuthenticated ? (
          <>
            <li>
              <Link 
                to="/dashboard" 
                className={`navbar-link ${currentPath === '/dashboard' ? 'active' : ''}`}
                aria-current={currentPath === '/dashboard' ? 'page' : undefined}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/expenses" 
                className={`navbar-link ${currentPath === '/expenses' ? 'active' : ''}`}
                aria-current={currentPath === '/expenses' ? 'page' : undefined}
              >
                Expenses
              </Link>
            </li>
            <li>
              <Link 
                to="/budget" 
                className={`navbar-link ${currentPath === '/budget' ? 'active' : ''}`}
                aria-current={currentPath === '/budget' ? 'page' : undefined}
              >
                Budget
              </Link>
            </li>
            {/* Logout button */}
            <li>
              <button 
                className="navbar-link logout-button" 
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link 
                to="/login" 
                className={`navbar-link ${currentPath === '/login' ? 'active' : ''}`}
                aria-current={currentPath === '/login' ? 'page' : undefined}
              >
                Login
              </Link>
            </li>
            <li>
              <Link 
                to="/signup" 
                className={`navbar-link ${currentPath === '/signup' ? 'active' : ''}`}
                aria-current={currentPath === '/signup' ? 'page' : undefined}
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
