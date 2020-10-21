import dotenv from "dotenv";
import path from "path";
dotenv.config({path:path.resolve(__dirname,".env")});

import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import {sendSecretMail} from "./utils"

const PORT = process.env.PORT||4000;

const server = new GraphQLServer({schema});

server.express.use(logger("dev"));
//grapql server에 express server 내장되어 있음

//server start option(port, callback func)
server.start({port: PORT}, ()=> console.log(`Server running on http://localhost:${PORT}`));

