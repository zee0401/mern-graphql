import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs } from "@graphql-tools/merge";

import typeDefs from "../schema/typeDefs.js";
import resolvers from "../schema/resolvers.js";
import { connectToDatabase } from "../config/db.js";
import { passport } from "../config/passport.js";
import { createContext } from "../config/context.js";
import { createSchema } from "../config/schema.js";
import { createResolvers } from "../config/resolvers.js";

const server = new ApolloServer({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers,
  context: createContext,
  plugins: [passport],
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
