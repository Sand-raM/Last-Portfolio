import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Expense.css';

const API_ENDPOINT = 'https://sandra-portfolio.onrender.com/expenses';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: 0 });
  const [editing, setEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const { data: expenseData } = await axios.get(API_ENDPOINT);
      setExpenses(expenseData);
    } catch (error) {
      setError('Error fetching expenses. Please try again later.');
      console.error(error);
    }
  };

  const handleAddExpense = async (event) => {
    event.preventDefault();
    try {
      const { data: newExpenseData } = await axios.post(API_ENDPOINT, newExpense);
      setExpenses([...expenses, newExpenseData]);
      setNewExpense({ name: '', amount: 0 });
    } catch (error) {
      setError('Error adding expense. Please try again later.');
      console.error(error);
    }
  };

  const handleEditExpense = (expense) => {
    setEditing(true);
    setEditedExpense(expense);
  };

  const handleUpdateExpense = async (event) => {
    event.preventDefault();
    try {
      const { data: updatedExpenseData } = await axios.put(`${API_ENDPOINT}/${editedExpense.id}`, editedExpense);
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editedExpense.id ? updatedExpenseData : expense
      );
      setExpenses(updatedExpenses);
      setEditing(false);
      setEditedExpense({});
    } catch (error) {
      setError('Error updating expense. Please try again later.');
      console.error(error);
    }
  };

  const handleDeleteExpense = async (expense) => {
    try {
      await axios.delete(`${API_ENDPOINT}/${expense.id}`);
      const updatedExpenses = expenses.filter((e) => e.id !== expense.id);
      setExpenses(updatedExpenses);
    } catch (error) {
      setError('Error deleting expense. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Expenses</h1>
      {error && (
        <p className="error-message" role="alert">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </p>
      )}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name} - ${expense.amount}
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
