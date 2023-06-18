import Product from "../../features/product/models/product_model"
import db from "../db/connection"
import User from "../../features/user/models/user"

export const createTablesIfNotExists = async () => {
    createUserTableIfNotExist()
    createProductTableIfNotExist()
}

const createUserTableIfNotExist = () => {

    User.sync().then(() => {
        console.log("Tabla creada: Users")
    }).catch((e) => {
        console.log("Error al crear la tabla users")
    })
}
const createProductTableIfNotExist = () => {

    Product.sync().then(() => {
        console.log("Tabla creada: Productos")
    }).catch((e) => {
        console.log("Error al crear la tabla productos")
    })
}