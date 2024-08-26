require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/AuthMiddleware');

const app = express();

// CORS setup
app.use(cors({
  origin: ['https://sandra-front.onrender.com', 'http://localhost:3001'],
  credentials: true
}));

// Environment variables
console.log('Secret Key:', process.env.SECRET_KEY);
console.log('MONGO_URI:', process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: "SpendWise" })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(express.json());

// Routes
const routes = {
  budgets: require('./routes/BudgetRoutes'),
  expenses: require('./routes/ExpenseRoute'),
  users: require('./routes/UserRoute'),
  login: require('./routes/LoginRoute')
};

// Applying AuthMiddleware to routes that require authentication
app.use('/api/budgets', authMiddleware, routes.budgets);
app.use('/api/expenses', authMiddleware, routes.expenses);
app.use('/api/users', authMiddleware, routes.users);
app.use('/api', routes.login);

// Custom root route
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to SpendWise!</h1>
    <p>This is a custom message or page.</p>
    <p>Use the navigation menu to access budgets, expenses, and user management.</p>
  `);
});

// Test route
app.get('/test', (req, res) => {
  res.send('Welcome to SpendWise, your budget friend!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Disconnected from MongoDB');
  process.exit(0);
});
