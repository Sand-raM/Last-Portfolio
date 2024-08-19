import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: 0 });
  const [editing, setEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('https://sandra-portfolio.onrender.com/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExpense = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://sandra-portfolio.onrender.com/expenses', newExpense);
      setExpenses([...expenses, response.data]);
      setNewExpense({ name: '', amount: 0 });
    } catch (error) {
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
      const response = await axios.put(`https://sandra-portfolio.onrender.com/expenses/${editedExpense.id}`, editedExpense);
      const updatedExpenses = expenses.map((expense) => {
        if (expense.id === editedExpense.id) {
          return editedExpense;
        }
        return expense;
      });
      setExpenses(updatedExpenses);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExpense = async (expense) => {
    try {
      await axios.delete(`https://sandra-portfolio.onrender.com/expenses/${expense.id}`);
      const updatedExpenses = expenses.filter((e) => e.id !== expense.id);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Expenses</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name} - {expense.amount}
            <button onClick={() => handleEditExpense(expense)}>Edit</button>
            <button onClick={() => handleDeleteExpense(expense)}>Delete</button>
          </li>
        ))}
      </ul>
      {editing ? (
        <form onSubmit={handleUpdateExpense}>
          <label>
            Name:
            <input type="text" value={editedExpense.name} onChange={(event) => setEditedExpense({ ...editedExpense, name: event.target.value })} />
          </label>
          <label>
            Amount:
            <input type="number" value={editedExpense.amount} onChange={(event) => setEditedExpense({ ...editedExpense, amount: parseInt(event.target.value, 10) })} />
          </label>
          <button type="submit">Update</button>
        </form>
      ) : (
        <form onSubmit={handleAddExpense}>
          <label>
            Name:
            <input type="text" value={newExpense.name} onChange={(event) => setNewExpense({ ...newExpense, name: event.target.value })} />
          </label>
          <label>
            Amount:
            <input type="number" value={newExpense.amount} onChange={(event) => setNewExpense({ ...newExpense, amount: parseInt(event.target.value, 10) })} />
          </label>
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
};

export default Expense;
