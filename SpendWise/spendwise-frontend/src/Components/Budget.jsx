import React, { useState, useEffect } from 'react';
import api from '../api'; // Import the custom Axios instance
import '../Styles/Budget.css';

const Budget = () => {
  const [budget, setBudget] = useState(0);
  const [target, setTarget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state variable

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await api.get('/budgets'); // Use the api instance
      setBudget(response.data.budget);
      setTarget(response.data.target);
      setSpent(response.data.spent);
    } catch (error) {
      setError('Error fetching budget data. Please try again later.');
      console.error('Fetch error:', error);
      // Log error to logging service or analytics platform
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
      await api.put('/budgets', { target: updatedTargetAmount }); // Use the api instance
      fetchBudgetData(); // Refresh budget data after update
      setTarget(updatedTargetAmount); // Update local state with new target
    } catch (error) {
      setError('Error updating budget target. Please try again later.');
      console.error('Update error:', error);
      // Log error to logging service or analytics platform
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section className="budget">
      <h1>Budget Management</h1>
      {error && (
        <p className="error-message" role="alert">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </p>
      )}
      <article className="budget-info">
        <p>Current Budget: ${budget.toFixed(2)}</p>
        <p>Spent: ${spent.toFixed(2)}</p>
        <p>Target: ${target.toFixed(2)}</p>
      </article>
      <form onSubmit={handleUpdateBudget}>
        <label>
          Set New Target:
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseFloat(e.target.value))}
            min="0" // Prevent negative values
            aria-label="New target amount"
          />
        </label>
        <button type="submit" disabled={isUpdating} aria-label="Update target">
          {isUpdating ? 'Updating...' : 'Update Target'}
        </button>
      </form>
    </section>
  );
};

export default Budget;
