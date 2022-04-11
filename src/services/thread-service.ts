import Thread, { IxThread } from '../entity/thread-entity'
import User, { IxUser } from '../entity/user-entity'
import Sub from '../entity/sub-entity'
import SubModel from '../entity/sub-entity'
import { LeanDocument } from "mongoose"
import _ from 'lodash'

export const getAllThread = async (subName?: string): Promise<LeanDocument<IxThread>[]> => {
  let threadList = [] as LeanDocument<IxThread>[]

  if (subName) {
    const subId = await SubModel
      .findOne()
      .where({ SubLongName: subName })
      .exec();

    threadList = await Thread.find()
      .populate('Author', 'Username')
      .populate('SubParent', ['SubLongName', 'SubShortName'])
      .where({ SubParent: subId })
      .sort({ CreatedDate: -1 })
      .lean()
      .exec()
  } else {
    threadList = await Thread.find()
      .populate('Author', 'Username')
      .populate('SubParent', ['SubLongName', 'SubShortName'])
      .sort({ CreatedDate: -1 })
      .lean()
      .exec()
  }

  return Promise.resolve(threadList)
}

export const applyVoteStatus = (threadList: LeanDocument<IxThread>[], user: IxUser) => {
  threadList.forEach(thread => {
    if (user.UpvoteThread.map(_id => _id.toString()).includes(thread._id.toString())) thread.vote = 'up'
    else if (user.DownvoteThread.map(_id => _id.toString()).includes(thread._id.toString())) thread.vote = 'down'
  })
}

export const getOneThread = async (threadId: string): Promise<IxThread> => {
  const thread = await Thread.findOne()
    .populate('Author', 'Username')
    .populate('SubParent', ['SubLongName', 'SubShortName'])
    .where('_id', threadId)
    .exec()

  return Promise.resolve(thread)
}

export const createNewThread = async (thread: IxThread): Promise<IxThread> => {
  const user = await User.findOne({ _id: thread.Author }).exec()
  const sub = await Sub.findOne({ _id: thread.SubParent }).exec()

  user.UserThread.push(thread._id)
  user.save()
  sub.SubThread.push(thread._id)
  sub.save()

  const newThread = await thread.save()
  return newThread
}

export const voteThread = async (user: IxUser, thread: IxThread, vote: string): Promise<IxThread> => {
  if (vote === 'up') {
    if ((user.UpvoteThread).includes(thread._id)) {
      // console.log('1 > 0')
      thread.Upvote = thread.Upvote - 1
      user.UpvoteThread = _.remove(user.UpvoteThread, (id: string) => id === thread._id)
    }
    else if (user.DownvoteThread.includes(thread._id)) {
      // console.log('-1 > 1')
      thread.Downvote = thread.Downvote - 1
      thread.Upvote = thread.Upvote + 1
      user.UpvoteThread = user.UpvoteThread.concat([thread._id])
      user.DownvoteThread = _.remove(user.DownvoteThread, (id: string) => id === thread._id)
    }
    else {
      // console.log('0 > 1')
      thread.Upvote = thread.Upvote + 1
      user.UpvoteThread = user.UpvoteThread.concat([thread._id])
    }
  }
  else {
    if (user.DownvoteThread.includes(thread._id)) {
      // console.log('-1 > 0')
      thread.Downvote = thread.Downvote - 1
      user.DownvoteThread = _.remove(user.DownvoteThread, (id: string) => id === thread._id)
    }
    else if (user.UpvoteThread.includes(thread._id)) {
      // console.log('1 > -1')
      thread.Downvote = thread.Downvote + 1
      thread.Upvote = thread.Upvote - 1
      user.DownvoteThread = user.DownvoteThread.concat([thread._id])
      user.UpvoteThread = _.remove(user.UpvoteThread, (id: string) => id === thread._id)
    }
    else {
      // console.log('0 > -1')
      thread.Downvote = thread.Downvote + 1
      user.DownvoteThread = user.DownvoteThread.concat([thread._id])
    }
  }

  user.save()
  thread.save()
  return Promise.resolve(thread)
}
