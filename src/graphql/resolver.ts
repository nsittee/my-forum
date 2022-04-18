import { IxThread, Thread } from './../model/thread-model'
import { getUserFromContext } from './util'

export const resolvers = {
  // If function is defined under root...
  // (args, context, info) => {}
  threads: async (args, context, info) => {
    const user = getUserFromContext(context)
    const threads: IxThread[] = await Thread
      .find()
      .populate('Author', [])
      .populate('SubParent', [])
      .exec()
    return threads
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