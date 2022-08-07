const mongoose = require('mongoose');
const {Schema} = mongoose;

const userPostSchema = new mongoose.Schema({

  tweetEContent: {
    type: String,
    required: true,
  },

});

const UserPosts = mongoose.model('UserPost', userPostSchema)

module.exports = UserPosts;
