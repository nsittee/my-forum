import { IThread } from './thread.model';

export interface IUser {
  _id: string,
  username: string,
  password: string,

  userThread: [IThread],
  userSub: [{}]
}