import { graphqlHTTP } from "express-graphql"
import { schemas } from "./schema"
import { resolvers } from './resolver'

export const initGraphql = (app) => {
  app.use('/graphql', graphqlHTTP({
    schema: schemas,
    rootValue: resolvers,
    graphiql: true,
  }))
}
