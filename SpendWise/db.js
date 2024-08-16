const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB'); // Throw a custom error
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}

module.exports = { connectToMongoDB, disconnect };
