var mongoose = require("mongoose");

var subRedditSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  SubLongName: String,
  SubShortName: String,

  SubUser: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_user"
  }],
  SubThread: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "mf_thread"
  }]

});

module.exports = mongoose.model("mf_sub_reddit", subRedditSchema);