import { IUser } from "./user.model";

export interface IComment {
  _id: string,
  content: string,

  commenter: IUser
}