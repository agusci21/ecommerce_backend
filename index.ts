import dotenv from "dotenv"
dotenv.config()

import Server from "./core/models/server";
console.clear()
const server = new Server()
server.listen()
