var express = require("express");
const path = require("path");
import * as dotenv from "dotenv";
import * as TypeORM from "typeorm";
import buildSchema from "./apps/modules/graphql/schema";
import cors = require("cors");
import { ApolloServer } from "apollo-server-express";
import Container from "typedi";
import { GraphQLError, GraphQLFormattedError } from "graphql";

dotenv.config();
// establish database connection

TypeORM.useContainer(Container);

const bootstrap = async () => {
  try {
    var app = express();

    // create TypeORM connection
    await TypeORM.createConnection()
      .then(() => console.log("okkk"))
      .catch((err) => {
        console.log("FAILLL", err);
      });

    const schema = await buildSchema(Container);

    // Ở đây set origin: [/localhost*/] là để tất cả các app frontEnd khác ở localhost có thể gọi tới api của app này.
    // Nếu ko set sẽ bị lỗi Cross-domain.
    const corsConfig = {
      methods: "GET, HEAD, PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
      origin: [/localhost*/],
    };

    app.use(cors(corsConfig));

    //Apolo server sẽ tạo graphql server,
    //playGround: true: có thể test các schema trực tiếp tại localhost localhos:
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      debug: true,
      playground: true,
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        if (error && error.extensions) {
          error.extensions.code = "GRAPHQL_VALIDATION_FAILED";
        }
        return error;
      },
    });

    server.applyMiddleware({ app, cors: corsConfig });

    let port = 3000;
    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
