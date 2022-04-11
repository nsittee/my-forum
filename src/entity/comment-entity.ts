import Mongoose from "mongoose"
import tableConstant from "./table-constant"

export interface IxComment extends Mongoose.Document {
  _id: string,
  Content: string,
  Commenter: any,
}

var commentSchema = new Mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  Content: String,
  Commenter: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: tableConstant.user
  }
});

export default Mongoose.model(tableConstant.comment, commentSchema)