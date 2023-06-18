import { application, Router } from 'express'
import { check } from 'express-validator'
import {
  getUsers,
  getUserById,
  createAnUser,
  modifyAnUserById,
  deleteAnUserById,
} from '../contollers/user'
import { validateFields } from '../../../middlewares/validate_fields'
const router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/create',[
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  check('email', 'El correo no es valido').isEmail(),
  validateFields
],createAnUser)
router.put('/:id', modifyAnUserById)
router.delete('/:id', deleteAnUserById)

export default router
