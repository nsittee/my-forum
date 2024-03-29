import { IxSub } from '../../model/sub-model'
import {
  getOneThread,
  getAllThread,
  applyVoteStatus,
  getSubFromId,
  createNewThread
} from '../../services/thread-service'
import { getUserFromContext } from '../util'

export const resolvers = {
  // If function is defined under root...
  // (args, context, info) => {}
  sub: async ({ subName }, context, info) => {
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
    const thread = await getOneThread(id)
    return thread
  },
  user: async (args, context, info) => {
    const user = getUserFromContext(context)
    if (!user) return null

    return user
  },

  createThread: async ({ input }, context, info) => {
    const reqNewThread = {
      title: input.title,
      content: input.content,
      authorId: input.authorId,
      subId: input.subId
    }
    const createdThread = await createNewThread(reqNewThread)
    return createdThread._id
  }
}