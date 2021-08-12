import { ISub } from './sub.model';
import { IUser } from "./user.model";

export interface IThread {
  _id: string,
  Title: string,
  Content: string,
  Upvote: number,
  Downvote: number,

  Author: IUser,
  // ThreadComment: [{}],
  SubParent: ISub,
}