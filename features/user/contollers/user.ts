import { Request, Response } from 'express'
import User from '../models/user'
import bcryptjs from 'bcryptjs'
import { checkIfEmailExists } from '../../../core/helpers/check_if_email_exists'
import { v4 as uuidv4 } from 'uuid';
import Product from '../../product/models/product_model';
uuidv4()

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll()
    return res.json({users})
  } catch (error) {
    console.clear()
    console.log(error)
    return res.status(500).json({
      msg: 'Error interno del servidor',
    })
  }
}
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user)
      return res.status(404).json({
        msg: `El usuario con id ${req.params.id} no existe`,
      })
    return res.json({user})
  } catch (error) {
    console.clear()
    console.log(error)
    return res.status(500).json({
      msg: 'Error interno del servidor',
    })
  }
}
export const createAnUser = async (req: Request, res: Response) => {
  const existEmail = await checkIfEmailExists(req.body.email)
  if(existEmail) return res.status(400).json({
    msg: `El email ${req.body.email} ya esta en uso`
  })
  try {
    const user = User.build(req.body)
    user.id = uuidv4()
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(req.body.password, salt)
    await user.save()
    const createdUser = await User.findOne({
      where: { email: req.body.email
      },
    })
    console.clear()
    return res.status(201).json({
      msg: 'Usuario creado',
      createdUser,
    })
  } catch (error) {
    console.clear()
    console.log(error)
    return res.status(500).json({
      msg: 'Problema interno del servidor',
    })
  }
}
export const modifyAnUserById = async (req: Request, res: Response) => {
  try {
    if(!req.params.id){
      return res.status(400).json({
        msg: "El id es obligatorio"
      })
    }
    const user = await User.findByPk(req.params.id)
    if(!user){
      return res.status(404).json({
        msg: "El usuario no existe"
      })
    }
  if(req.body.email){
    const existEmail = await checkIfEmailExists(req.body.email)
    if(existEmail) return res.status(400).json({
      msg: `El email ${req.body.email} ya esta en uso`
    })
  }
    const {password, ...data} = req.body
    console.log(data)
    user.set({
      data
    })
    console.log(user)

    await user.save()
    return res.status(200).json({
      user
    })
    
  } catch (error) {
    console.clear()
    console.log(error)
    return res.status(500).json({
      msg: 'Problema interno del servidor',
    })
  }


}
export const deleteAnUserById = (req: Request, res: Response) => {}
