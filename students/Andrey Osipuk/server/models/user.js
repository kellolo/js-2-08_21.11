const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  bio: { type: String },
  email: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('User', userSchema, 'users');
