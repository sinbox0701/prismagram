import "./env";

import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import {authenticateJwt} from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT||4000;

const server = new GraphQLServer({
    schema,
    context: ({request}) => ({request, isAuthenticated})
});
//context: resolver사이에 정보공유에 사용

server.express.use(logger("dev"));
//grapql server에 express server 내장되어 있음
server.express.use(authenticateJwt);

//server start option(port, callback func)
server.start({port: PORT}, ()=> console.log(`Server running on http://localhost:${PORT}`));

