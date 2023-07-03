import { DataTypes, Model } from "sequelize";
import db from "../../../core/db/connection";

class Category extends Model {
    declare id : string;
    declare name: string;
}
Category.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},{
    sequelize: db,
    tableName: 'category',
})

export default Category