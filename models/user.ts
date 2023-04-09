import { Model, DataTypes } from 'sequelize'
import db from '../db/connection'

class User extends Model {
  declare id: string
  declare name: string
  declare email: string
  declare password: string
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  },
  {
    tableName: 'users',
    sequelize: db,
  },
)

export default User