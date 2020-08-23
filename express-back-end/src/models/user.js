var mongoose = require("mongoose");
var table = require("./table-constant")

var userSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  UserName: { type: String, required: true, unique: true },
  Password: { type: String, required: true },

  UserThread: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_thread"
  }],
  UserSubReddit: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_sub_reddit"
  }]
});

module.exports = mongoose.model("mf_user", userSchema);