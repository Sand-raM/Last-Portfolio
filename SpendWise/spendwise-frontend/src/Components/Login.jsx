import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }, []);

  const validateInput = () => {
    if (!email || !password) {
      setError('Please enter your email and password');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInput()) return;
    setIsLoading(true);
    try {
      const response = await axios.post('https://sandra-portfolio.onrender.com/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setError(null);
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-label="Email address"
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        aria-label="Password"
      />
      <br />
      {error && (
        <p key="error-message" className="error-message" role="alert">
          {error}
        </p>
      )}
      {isLoading && (
        <p key="loading-indicator" className="loading">
          Loading...
        </p>
      )}
      <button type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );
};

export default Login;
