var mongoose = require("mongoose");
var table = require("./table-constant");


var commentSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Content: String,

  Commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: table.user
  }
});

module.exports = mongoose.model(table.comment, commentSchema);