var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Content: String,

  Commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_user"
  }
});

module.exports = mongoose.model("mf_comment", commentSchema);