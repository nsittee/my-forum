import Mongoose from "mongoose"
import tableConstant from "./table-constant"

export interface IxUser extends Mongoose.Document {
  _id: string,
  Username: string,
  Password: string,
  UpvoteThread: any,
  DownvoteThread: any,
  UserThread: any,
  UserSub: any,
}
var userSchema = new Mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },

  UpvoteThread: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableConstant.thread
  }],
  DownvoteThread: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableConstant.thread
  }],
  UserThread: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableConstant.thread
  }],
  UserSub: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableConstant.sub
  }]
});

export default Mongoose.model<IxUser>(tableConstant.user, userSchema)