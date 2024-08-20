import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Login.css'; // Import the CSS file from the same directory

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://sandra-portfolio.onrender.com/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setError(null);
      setIsLoading(false);
      window.location.href = '/dashboard'; // Redirects after successful login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      {error && <p className="error-message">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
