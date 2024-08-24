require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

console.log('Secret Key:', process.env.SECRET_KEY);
console.log('MONGO_URI:', process.env.MONGO_URI);
app.use(cors());

// Connecting to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI, {dbName:"SpendWise"})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(express.json());

// Routes
app.use('/budgets', require('./routes/BudgetRoutes'));
app.use('/expenses', require('./routes/ExpenseRoute'));
app.use('/users', require('./routes/UserRoute'));
app.use('/', require('./routes/LoginRoute'));

// Custom message for the root route (/)
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to SpendWise!</h1>
    <p>This is a custom message or page.</p>
    <p>Use the navigation menu to access budgets, expenses, and user management.</p>
  `);
});

// Test route to verify server is setup
app.get('/test', (req, res) => {

    res.send('Welcome to SpendWise, your budget friend!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
});
