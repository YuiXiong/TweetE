const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  displayname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    required: true,
  },
});

const User = mongoose.model(User, userSchema)

module.exports = User;
