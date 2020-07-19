var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  userName: String,
  userPassword: String,
  userThread: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_threads"
  }]
});

module.exports = mongoose.model("mf_users", userSchema);

// 097 183 7599