import { where } from 'sequelize/types'
import User from '../models/user'
export const checkIfEmailExists = async (email: string) => {
  const user = await User.findOne({
    where: { email },
  })
  return user !== null
}
