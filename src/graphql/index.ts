import { IxThread, Thread } from './../model/thread-model';
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const resolver = {
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

export const initGraphql = (app) => {
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  }));
}
