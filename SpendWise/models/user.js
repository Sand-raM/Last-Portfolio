const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true }, // For password confirmation
  name: String,
  role: { type: String, default: 'user' }, // User roles
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Password confirmation validation
userSchema.path('confirmPassword').validate(function(confirmPassword) {
  return confirmPassword === this.password;
}, 'Passwords do not match');

// Password hashing middleware
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
    user.confirmPassword = undefined; // Remove confirm password after hashing
  }
  next();
});

// Check if the model already exists before creating it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
