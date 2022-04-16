import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import data from "./data";

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
}

// The root provides a resolver function for each API endpoint
const resolver = {
  books: (args): Book[] => {
    const limit: number = args.limit
    return data.slice(0, limit)
  },
  book: (args): Book => {
    const id: string = args.id
    return data.find(book => book.id.toString() === id)
  }
}

export const initGraphql = (app) => {
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  }));
}
