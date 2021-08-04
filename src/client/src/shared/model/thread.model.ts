import { ISub } from './sub.model';
import { IUser } from "./user.model";

export interface IThread {
  _id: string,
  title: string,
  content: string,
  upvote: number,
  downvote: number,

  author: IUser,
  threadComment: [{}],
  subParent: ISub,
}