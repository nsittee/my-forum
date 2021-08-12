import { ISub, defaultSub } from './sub.model';
import { defaultUser, IUser } from "./user.model";

export interface IThread {
  _id: string,
  Title: string,
  Content: string,
  CreatedDate: string,
  Upvote: number,
  Downvote: number,
  Author: IUser,
  // ThreadComment: [{}],
  SubParent: ISub,
}

export const defaultThread: IThread = {
  _id: '',
  Title: '',
  Content: '',
  CreatedDate: '',
  Upvote: 0,
  Downvote: 0,
  Author: defaultUser,
  SubParent: defaultSub,
}