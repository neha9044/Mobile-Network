import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { context } from "./context";
import typeDefs from "./schemas/index";
import resolvers from "./resolvers/index";

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context,
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
