import { Sequelize } from "sequelize";

const dbName : string = process.env.DB_NAME || ''
const dbUser : string = process.env.DB_USER || ''
const dbPassword : string = process.env.DB_PASSWORD|| ''

const db = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'sqlite',
    storage: './core/db/database.sqlite',
  
})

export default db