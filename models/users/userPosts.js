const mongoose = require('mongoose');
const {Schema} = mongoose;

const userPostSchema = new mongoose.Schema({

  tweetEContent: {
    type: String,
    required: true,
  },
  tweetEAuthor: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }

});

const UserPosts = mongoose.model('UserPost', userPostSchema)

module.exports = UserPosts;
