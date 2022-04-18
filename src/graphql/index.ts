import { authenticate } from './../middleware/authenticate'
import { graphqlHTTP } from "express-graphql"
import { schemas } from "./schema"
import { resolvers } from './resolver'

// Setup context for req/res from express
// https://stackoverflow.com/questions/51779230/parameters-ordering-to-get-context-in-express-graphql
// https://stackoverflow.com/questions/48630023/wrong-order-of-graphql-resolver-arguments-root-args-context

// For simplicity with auth middleware, all route will require authenticate optional for now
export const initGraphql = (app) => {
  app.use('/graphql', authenticate(true), graphqlHTTP((req, res) => ({
    context: { req, res },
    schema: schemas,
    rootValue: resolvers,
    graphiql: true,
  })))
}
