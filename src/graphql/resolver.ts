import { IxThread, Thread } from './../model/thread-model';

export const resolvers = {
  threads: async (args) => {
    const threads: IxThread[] = await Thread
      .find()
      .populate('Author', [])
      .populate('SubParent', [])
      .exec()
    return threads
  },
  thread: async ({ id }) => {
    const thread: IxThread = await Thread
      .findById(id)
      .populate('Author', [])
      .populate('SubParent', [])
      .exec()

    return thread
  }
}