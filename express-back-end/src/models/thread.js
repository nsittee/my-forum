var mongoose = require("mongoose");

var threadSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Title: String,
  Content: String,
  Upvote: Number,
  Downvote: Number,
  CreatedDate: Date,

  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_user"
  },
  ThreadComment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_comment"
  }],
  SubRedditParent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_sub_reddit"
  }]
});

module.exports = mongoose.model("mf_thread", threadSchema);