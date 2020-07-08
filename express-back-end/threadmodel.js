var mongoose = require("mongoose");
var threadSchema = mongoose.Schema({
  threadId: Number,
  threadTitle: String,
  subRedditId: Number,
  subReddit: String,
  content: String,
  author: String,
  published: {
    date: String,
    time: String
  },
  upVote: Number,
  downVote: Number
});

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Thread = mongoose.model("threads", threadSchema);
module.exports = Thread;