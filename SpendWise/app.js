require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
console.log('Secret Key:', process.env.SECRET_KEY);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(express.json());

// Routes
app.use('/budgets', require('./routes/budgetRoutes'));
app.use('/expenses', require('./routes/expenseRoute'));
app.use('/users', require('./routes/UserRoute'));
app.use('/', require('./routes/LoginRoute'));

// Test route to verify server setup
app.get('/test', (req, res) => {
  res.send('Welcome to SpendWise, your budget friend!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Disconnected from MongoDB');
  process.exit(0);
});
