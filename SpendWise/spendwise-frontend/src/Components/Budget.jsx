import React, { useState, useEffect } from 'react';
import api from '../api'; // Import the custom Axios instance
import '../Styles/Budget.css';

const Budget = () => {
  const [budget, setBudget] = useState(null);
  const [target, setTarget] = useState(null);
  const [spent, setSpent] = useState(null);
  const [budgetId, setBudgetId] = useState(null); // Add a state for budget ID
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state variable

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await api.get('/api/budgets');
      const budgets = response.data; // Get the array of budgets
      if (budgets.length > 0) {
        const firstBudget = budgets[0]; // Get the first budget
        setBudget(firstBudget.amount); // Set the budget amount
        setTarget(firstBudget.target); // Set the target amount
        setSpent(firstBudget.spent); // Set the spent amount
        setBudgetId(firstBudget._id); // Set the budget ID
      } else {
        setBudget(null);
        setTarget(null);
        setSpent(null);
        setBudgetId(null);
      }
    } catch (error) {
      setError('Error fetching budget data. Please try again later.');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  const handleUpdateBudget = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    try {
      const updatedTargetAmount = parseFloat(event.target.target.value);
      if (isNaN(updatedTargetAmount) || updatedTargetAmount <= 0) {
        setError('Please enter a valid and positive number.');
        setIsUpdating(false);
        return;
      }
      await api.put(`/api/budgets/${budgetId}`, { target: updatedTargetAmount });
      fetchBudgetData(); // Refresh budget data after update
      setTarget(updatedTargetAmount); // Update local state with new target
    } catch (error) {
      setError('Error updating budget target. Please try again later.');
      console.error('Update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return (
    <p className="error-message" role="alert">
      {error}
      <button onClick={() => setError(null)}>Dismiss</button>
    </p>
  );

  return (
    <section className="budget">
      <h1>Budget Management</h1>
      <article className="budget-info">
        <p>Current Budget: {budget === null ? 'Loading...' : `$${budget.toFixed(2)}`}</p>
        <p>Spent: {spent === null ? 'Loading...' : `$${spent.toFixed(2)}`}</p>
        <p>Target: {target === null ? 'Loading...' : `$${target.toFixed(2)}`}</p>
      </article>
      <form onSubmit={handleUpdateBudget}>
        <label>
          Set New Target:
          <input
            type="number"
            value={target === null ? '' : target}
            onChange={(e) => setTarget(parseFloat(e.target.value))}
            min="0" // Prevent negative values
            aria-label="New target amount"
            required
            autoComplete="off" // Prevents autofill if not desired
          />
        </label>
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Target'}             </button>
      </form>
    </section>
  );
};

export default Budget;
