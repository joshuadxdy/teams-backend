import {ApolloServer} from '@apollo/server';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {expressMiddleware} from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';

import {typeDefs, resolvers} from '@/graphql';

interface MyContext {
  token?: String;
}

const app: express.Application = express();
const httpServer = http.createServer(app);
const server: ApolloServer<MyContext> = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
  plugins: [ApolloServerPluginDrainHttpServer({
    httpServer,
  })],
});

const bootstrapServer = async (): Promise<void> => {
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    express.urlencoded({extended: true}),
    expressMiddleware(server, {
      context: async ({req}) => ({token: req.headers.token}),
    })
  );
  const controller = new AbortController();
  httpServer.listen(
    {port: 4000, signal: controller.signal, host: 'localhost'},
    () => {
      console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    }
  );
  controller.abort();
};

bootstrapServer();
