import { DataTypes, Model } from "sequelize"
import db from "../../../core/db/connection";

class Product extends Model{
    declare id: string;
    declare name: string;
    declare description: string;
    declare stock : number;
    declare price : number;
}

Product.init({
    
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull:false,
    },
  
},{
    tableName: 'product',
    sequelize: db,
})

export default Product