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
        if (!token) {
          throw new Error('No token found');
        }
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

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  return (
    <div className="dashboard">
      <h1>Welcome, {userData?.name}</h1>

      <div className="section">
        <h2>Summary of Expenses</h2>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Average Expense: ${averageExpense.toFixed(2)}</p>
      </div>

      <div className="section">
        <h2>Your Expenses</h2>
        <ul>
          {expenses.map(expense => (
            <li key={expense._id}>
              {expense.description}: ${expense.amount.toFixed(2)} on {new Date(expense.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
        <button className="quick-add-btn" onClick={() => console.log('Add new expense!')}>Quick Add Expense</button>
      </div>

      <div className="section">
        <h2>Budget Overview</h2>
        <p>Budget Name: {userData?.budgetName || 'N/A'}</p>
        <p>Category: {userData?.budgetCategory || 'N/A'}</p>
        <p>Amount: ${userData?.budgetAmount || '0.00'}</p>
        <p>Start Date: {userData?.budgetStartDate ? new Date(userData?.budgetStartDate).toLocaleDateString() : 'N/A'}</p>
        <p>End Date: {userData?.budgetEndDate ? new Date(userData?.budgetEndDate).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default Dashboard;
