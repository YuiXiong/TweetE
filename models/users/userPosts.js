const mongoose = require('mongoose');

const userPostSchema = new mongoose.Schema({

  postContent: {
    type: String,
    required: true,
  }
  
});

const UserPosts = mongoose.model('UserPost', userPostSchema)

module.exports = UserPosts;
