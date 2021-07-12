var mongoose = require("mongoose");
var table = require("./table-constant");

var subSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  SubLongName: String,
  SubShortName: String,

  SubUser: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: table.user
  }],
  SubThread: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: table.thread
  }]

});

module.exports = mongoose.model(table.sub, subSchema);