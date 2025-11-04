const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
    lowercase: true
  },
  name: {
    type: String
  },
  // This object will store the unique IDs from Google, Facebook, etc.
  providers: {
    googleId: {
      type: String,
      sparse: true, // Allows multiple null values
      unique: true  // but ensures any googleId value is unique
    },
    facebookId: {
      type: String,
      sparse: true,
      unique: true
    }
  }
}, {
  // Automatically adds 'createdAt' and 'updatedAt' fields
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;