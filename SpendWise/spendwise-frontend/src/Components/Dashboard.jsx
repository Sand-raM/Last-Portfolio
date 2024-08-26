import React, { useState, useEffect } from 'react';
import api from '../api';
import '../Styles/Dashboard.css';

const ENDPOINTS = {
  USER_ME: '/api/users/me',
  EXPENSES: '/api/expenses',
  BUDGETS: '/api/budgets',
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const userResponse = await api.get(ENDPOINTS.USER_ME);
      const expenseResponse = await api.get(ENDPOINTS.EXPENSES);
      const budgetResponse = await api.get(ENDPOINTS.BUDGETS);
      setUserData(userResponse.data);
      setExpenses(expenseResponse.data);
      setBudgets(budgetResponse.data);
  OOB  } catch (error) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
        <span className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchUserData}>Retry</button>
      </div>
    );
  }

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  return (
    <div className="dashboard">
      <h1>Welcome, {userData?.name ?? 'Unknown'}</h1>

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
        <h2>Your Budgets</h2>
        <ul>
          {budgets.map(budget => (
            <li key={budget._id}>
              {budget.name}: ${budget.amount.toFixed(2)} ({budget.category})
            </li>
          ))}
        </ul>
        <button className="quick-add-btn" onClick={() => console.log('Add new budget!')}>Quick Add Budget</button>
      </div>

      <div className="section">
        <h2>Budget Overview</h2>
        <p>Budget Name: {userData?.budgetName ?? 'N/A'}</p>
        <p>Category: {userData?.budgetCategory ?? 'N/A'}</p>
        <p>Amount: ${userData?.budgetAmount ?? '0.00'}</p>
        <p>Start Date: {userData?.budgetStartDate ? new Date(userData?.budgetStartDate).toLocaleDateString() : 'N/A'}</p>
        <p>End Date: {userData?.budgetEndDate ? new Date(userData?.budgetEndDate).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

OB
export default Dashboard;
