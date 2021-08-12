import { ISub } from './sub.model';
import { IThread } from './thread.model';

export interface IUser {
  _id: string,
  Username: string,
  Password: string,
  UserThread: IThread[],
  UserSub: ISub[]
}

export const defaultUser: IUser = {
  _id: '',
  Username: '',
  Password: '',
  UserThread: [],
  UserSub: []
}