require("dotenv").config();
import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT||4000;

const server = new GraphQLServer({schema});

server.express.use(logger("dev"));
//grapql server에 express server 내장되어 있음

//server start option(port, callback func)
server.start({port: PORT}, ()=> console.log(`Server running on http://localhost:${PORT}`));

