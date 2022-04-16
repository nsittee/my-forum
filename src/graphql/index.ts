import { graphqlHTTP } from "express-graphql";
import { initGraphqlSchema } from "./schema";
import { resolvers } from './resolver';

export const initGraphql = (app) => {
  app.use('/graphql', graphqlHTTP({
    schema: initGraphqlSchema(),
    rootValue: resolvers,
    graphiql: true,
  }));
}
