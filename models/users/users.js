const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPost: {
    type: Schema.Types.ObjectId,
    ref: 'UserPost',
  }
  // admin: {
  //   type: Boolean,
  //   required: true
  // }
});

const User = mongoose.model('User', userSchema)

module.exports = User;
