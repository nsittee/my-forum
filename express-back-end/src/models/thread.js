var mongoose = require("mongoose");
var table = require("./table-constant");


var threadSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Title: String,
  Content: String,
  Upvote: Number,
  Downvote: Number,
  CreatedDate: Date,

  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: table.user
  },
  ThreadComment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: table.comment
  }],
  SubParent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: table.sub
  }]
});

module.exports = mongoose.model(table.thread, threadSchema);