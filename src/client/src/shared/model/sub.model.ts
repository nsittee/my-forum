import { IThread } from './thread.model';
import { IUser } from "./user.model";

export interface ISub {
  _id: string,
  subLongName: string,
  subShortName: string,

  subUser: [IUser],
  subThread: [IThread]
}