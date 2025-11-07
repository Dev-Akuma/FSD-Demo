const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  providers: {
    googleId: {
      type: String,
      sparse: true,
      unique: true
    },
    facebookId: {
      type: String,
      sparse: true,
      unique: true
    },
    githubId: {
      type: String,
      sparse: true,
      unique: true
    }
  }
}, {
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;