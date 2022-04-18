import { IxSub } from './../model/sub-model'
import { getAllThread, applyVoteStatus, getSubFromId } from './../services/thread-service'
import { IxThread, Thread } from './../model/thread-model'
import { getUserFromContext } from './util'

export const resolvers = {
  // If function is defined under root...
  // (args, context, info) => {}
  threads: async ({ subName }, context, info) => {
    const user = getUserFromContext(context)
    let sub: IxSub

    if (subName) sub = await getSubFromId(subName)
    const threadList = await getAllThread(sub)
    if (user) applyVoteStatus(threadList, user)

    return {
      _id: sub ? sub._id : '',
      SubLongName: subName,
      SubThread: threadList,
    }
  },
  thread: async ({ id }, context, info) => {
    const thread: IxThread = await Thread
      .findById(id)
      .populate('Author', [])
      .populate('SubParent', [])
      .exec()

    return thread
  }
}