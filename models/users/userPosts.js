const mongoose = require('mongoose');

const userPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User"
  },
  postContent: {
    type: String,
    required: true,
  },
  postComment: [{
    type: Array,
  }]
  
});

const UserPosts = mongoose.model('UserPost', userPostSchema)

module.exports = UserPosts;
