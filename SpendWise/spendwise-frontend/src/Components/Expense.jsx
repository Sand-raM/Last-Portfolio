import React, { useState, useEffect } from 'react';
import api from '../api'; // Import the custom Axios instance
import '../Styles/Expense.css';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: 0 });
  const [editing, setEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state variable

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setIsLoading(true); // Set loading to true
    try {
      const { data: expenseData } = await api.get('/api/expenses');
      setExpenses(expenseData);
    } catch (error) {
      setError('Error fetching expenses. Please try again later.');
      console.error('Fetch error:', error);
      // Log error to logging service or analytics platform
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  const handleAddExpense = async (event) => {
    event.preventDefault();
    try {
      const { data: newExpenseData } = await api.post('/api/expenses', newExpense);
      setExpenses([...expenses, newExpenseData]);
      setNewExpense({ name: '', amount: 0 });
    } catch (error) {
      setError('Error adding expense. Please try again later.');
      console.error('Add error:', error);
      // Log error to logging service or analytics platform
    }
  };

  const handleEditExpense = (expense) => {
    setEditing(true);
    setEditedExpense(expense);
  };

  const handleUpdateExpense = async (event) => {
    event.preventDefault();
    try {
      const { data: updatedExpenseData } = await api.put(`/api/expenses/${editedExpense._id}`, editedExpense);
      const updatedExpenses = expenses.map((expense) =>
        expense._id === editedExpense._id ? updatedExpenseData : expense
      );
      setExpenses(updatedExpenses);
      setEditing(false);
      setEditedExpense({});
    } catch (error) {
      setError('Error updating expense. Please try again later.');
      console.error('Update error:', error);
      // Log error to logging service or analytics platform
    }
  };

  const handleDeleteExpense = async (expense) => {
    try {
      await api.delete(`/api/expenses/${expense._id}`);
      const updatedExpenses = expenses.filter((e) => e._id !== expense._id);
      setExpenses(updatedExpenses);
    } catch (error) {
      setError('Error deleting expense. Please try again later.');
      console.error('Delete error:', error);
      // Log error to logging service or analytics platform
    }
  };

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.name} - ${expense.amount.toFixed(2)}
            <button onClick={() => handleEditExpense(expense)}>Edit</button>
            <button onClick={() => handleDeleteExpense(expense)}>Delete</button>
          </li>
        ))}
      </ul>
      {editing ? (
        <form onSubmit={handleUpdateExpense}>
          <label>
            Name:
            <input
              type="text"
              value={editedExpense.name}
              onChange={(event) => setEditedExpense({ ...editedExpense, name: event.target.value })}
              aria-label="Expense name"
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={editedExpense.amount}
              onChange={(event) => setEditedExpense({ ...editedExpense, amount: parseFloat(event.target.value) })}
              min="0"
              aria-label="Expense amount"
            />
          </label>
          <button type="submit">Update</button>
        </form>
      ) : (
        <form onSubmit={handleAddExpense}>
          <label>
            Name:
            <input
              type="text"
              value={newExpense.name}
              onChange={(event) => setNewExpense({ ...newExpense, name: event.target.value })}
              aria-label="New expense name"
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={newExpense.amount}
              onChange={(event) => setNewExpense({ ...newExpense, amount: parseFloat(event.target.value) })}
              min="0"
              aria-label="New expense amount"
            />
          </label>
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
};

export default Expense;
