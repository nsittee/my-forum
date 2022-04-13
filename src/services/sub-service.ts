import { IxUser } from './../entity/user-entity'
import Sub from '../entity/sub-entity'

export const userJoinSub = async (subId: string, user: IxUser) => {
  const sub = await Sub.findById(subId).exec()
  if ((user.UserSub as string[]).includes(subId) // validate users joing the same sub
    && (sub.SubUser as string[]).includes(user._id)) {
    throw -1
  }

  user.UserSub.push(subId)
  sub.SubUser.push(user._id)
  sub.save()
  user.save()
}

export const userLeaveSub = async (subId: string, user: IxUser) => {
  const sub = await Sub.findById(subId).exec()
  if (!(user.UserSub as string[]).includes(subId)
    && !(sub.SubUser as string[]).includes(user._id)) {
    throw -1
  }

  user.UserSub = (user.UserSub as string[]).filter(userSubId => userSubId.toString() !== subId)
  sub.SubUser = (sub.SubUser as string[]).filter(subUserId => subUserId.toString() !== user._id.toString())
  sub.save()
  user.save()
}
