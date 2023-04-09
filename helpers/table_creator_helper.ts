import db from "../db/connection"
import User from "../models/user"

export const createTablesIfNotExists = async () => {
    await createUserTableIfNotExist()
}

const createUserTableIfNotExist = () => {

    User.sync().then(() => {
        console.log("Tabla creada: Users")
    }).catch((e) => {
        console.log("Error al crear la tabla users")
    })
}