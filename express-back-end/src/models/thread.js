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
module.exports = mongoose.model("mf_threads", threadSchema);

// 097 183 7599