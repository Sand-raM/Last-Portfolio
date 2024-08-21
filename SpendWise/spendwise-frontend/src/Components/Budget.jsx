import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Budget.css';

const API_ENDPOINT = 'https://sandra-portfolio.onrender.com/budgets';

const Budget = () => {
  const [budget, setBudget] = useState(0);
  const [target, setTarget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setBudget(response.data.budget);
      setTarget(response.data.target);
      setSpent(response.data.spent);
    } catch (error) {
      setError('Error fetching budget data. Please try again later.');
      console.error(error);
      // Log error to logging service or analytics platform
    }
  };

  const handleUpdateBudget = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    try {
      const newTarget = parseFloat(event.target.target.value);
      if (isNaN(newTarget) || newTarget <= 0) {
        setError('Please enter a valid and positive number.');
        setIsUpdating(false);
        return;
      }
      await axios.put(API_ENDPOINT, { target: newTarget });
      fetchBudgetData(); // Refresh budget data after update
      setTarget(newTarget); // Update local state with new target
    } catch (error) {
      setError('Error updating budget target. Please try again later.');
      console.error(error);
      // Log error to logging service or analytics platform
    } finally {
      setIsUpdating(false);
    }
  };

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
