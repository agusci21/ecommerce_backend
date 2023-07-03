import Category from "../../features/category/models/category"
import Product from "../../features/product/models/product_model"
import User from "../../features/user/models/user"

export const createTablesIfNotExists = async () => {
    createUserTableIfNotExist()
    createProductTableIfNotExist()
    createCategoriesTableIfNotExist()
}

const createUserTableIfNotExist = () => {

    User.sync().then(() => {
        console.log("Tabla creada: Users")
    }).catch((_) => {
        console.log("Error al crear la tabla users")
    })
}
const createProductTableIfNotExist = () => {

    Product.sync().then(() => {
        console.log("Tabla creada: Productos")
    }).catch((_) => {
        console.log("Error al crear la tabla productos")
    })
}
const createCategoriesTableIfNotExist = () => {

    Category.sync().then(() => {
        console.log("Tabla creada: Category")
    }).catch((_) => {
        console.log("Error al crear la tabla categorias")
    })
}