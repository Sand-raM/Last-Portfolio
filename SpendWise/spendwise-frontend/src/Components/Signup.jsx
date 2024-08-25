import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Signup.css'; // Import the CSS file

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post('https://sandra-portfolio.onrender.com/users/register', {
        name,
        email,
        password,
      });
      console.log(response.data);
      navigate('/login', { replace: true }); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed. Please check your email and password and try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} aria-labelledby="signup-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-required="true"
            aria-describedby="name-error"
          />
          {error && <p id="name-error" className="error-message">{error}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-required="true"
            aria-describedby="email-error"
          />
          {error && <p id="email-error" className="error-message">{error}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-required="true"
            aria-describedby="password-error"
          />
          {error && <p id="password-error" className="error-message">{error}</p>}
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            aria-required="true"
            aria-describedby="confirm-password-error"
          />
          {error && <p id="confirm-password-error" className="error-message">{error}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      {error && ![name, email, password, confirmPassword].every(field => field) && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Signup;
