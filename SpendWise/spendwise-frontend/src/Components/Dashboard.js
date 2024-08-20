import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Dashboard.css'; // Import from Styles

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await axios.get('https://sandra-portfolio.onrender.com/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const expenseResponse = await axios.get('https://sandra-portfolio.onrender.com/expenses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(userResponse.data);
        setExpenses(expenseResponse.data);
      } catch (error) {
        setError('Failed to fetch data.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="dashboard">
      <h1>Welcome, {userData?.name}</h1>

      <div className="section">
        <h2>Your Expenses</h2>
        <ul>
          {expenses.map(expense => (
            <li key={expense._id}>
              {expense.description}: ${expense.amount} on {new Date(expense.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
