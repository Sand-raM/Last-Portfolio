import React from 'react';
import './App.css'; //Import from Css//
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Budget from './Components/Budget';
import Expense from './Components/Expense';
import Login from './Components/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/expenses" element={<Expense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
