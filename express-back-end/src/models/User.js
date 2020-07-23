var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true },
  userPassword: { type: String, required: true },
  userThread: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_threads"
  }]
});

module.exports = mongoose.model("mf_users", userSchema);

// 097 183 7599