import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Budget.css'; // Import the CSS file

const Budget = () => {
  const [budget, setBudget] = useState(0);
  const [target, setTarget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get('https://sandra-portfolio.onrender.com/budgets');
      setBudget(response.data.budget);
      setTarget(response.data.target);
      setSpent(response.data.spent);
    } catch (error) {
      setError('Error fetching budget data.');
      console.error(error);
    }
  };

  const handleUpdateBudget = async (event) => {
    event.preventDefault();
    try {
      await axios.put('https://sandra-portfolio.onrender.com/budgets', { target });
      fetchBudgetData(); // Refresh budget data after update
    } catch (error) {
      setError('Error updating budget target.');
      console.error(error);
    }
  };

  return (
    <div className="budget">
      <h1>Budget</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="budget-info">
        <p>Current Budget: ${budget}</p>
        <p>Spent: ${spent}</p>
        <p>Target: ${target}</p>
      </div>
      <form onSubmit={handleUpdateBudget}>
        <label>
          Set New Target:
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseFloat(e.target.value))}
          />
        </label>
        <button type="submit">Update Target</button>
      </form>
    </div>
  );
};

export default Budget;
