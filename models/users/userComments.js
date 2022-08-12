const mongoose = require('mongoose');
const {Schema} = mongoose;

const userCommentSchema = new mongoose.Schema({

  commentContent: {
    type: String,
    required: true,
  },
  commentAuthor:{
    type: String,
    ref: 'User'
  },

  tweetEid: {
    type: Schema.Types.ObjectId, 
    ref: 'UserPost',
    required: true
  }

});

const UserComments = mongoose.model('UserComment', userCommentSchema)

module.exports = UserComments;
