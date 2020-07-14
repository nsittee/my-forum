var mongoose = require("mongoose");
var threadSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  threadTitle: String,
  threadPoster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_users"
  },
  subForumId: Number,
  subForum: String,
  content: String,
  published: {
    date: String,
    time: String
  },
  upVote: Number,
  downVote: Number
});
var userSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  userName: String,
  userPassword: String,
  userThread: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_threads"
  }]
});

module.exports = {
  Thread: mongoose.model("mf_threads", threadSchema),
  User: mongoose.model("mf_users", userSchema)
};

// 097 183 7599