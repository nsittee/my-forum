var mongoose = require("mongoose");
var table = require("./table-constant");


var userSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },

  UserThread: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: table.thread
  }],
  UserSub: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: table.sub
  }]
});

module.exports = mongoose.model(table.user, userSchema);