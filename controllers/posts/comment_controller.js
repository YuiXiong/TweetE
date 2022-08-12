const UserModel = require("../../models/users/users");
const PostModel = require("../../models/users/userPosts");
const CommentModel = require("../../models/users/userComments");
const mongoose = require('mongoose')

const controller = {
    // /post/:postId/comment
  postComment: async (req, res) => {
    try {    
    console.log(req.body.commentData)
      await CommentModel.create({
        commentContent: req.body.commentData,
        tweetEid: req.params.postId
    });
    } catch (err) {
      res.send("Error creating comment on DB");
      return;
    }
    console.log('comment created')
    res.redirect("/post");
  },
  
//   getAllComment: async (req, res) => {
//     const tweetE = await postModel.find().exec();
//     res.render("posts/showall", { tweetE });
//   },

  
};
module.exports = controller;
