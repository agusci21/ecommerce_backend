import dotenv from "dotenv"
dotenv.config()

import Server from "./models/server";
console.clear()
const server = new Server()
server.listen()

//TODO crear los middlewares