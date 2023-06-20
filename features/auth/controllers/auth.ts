import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from '../../user/models/user';
import { generateJWT } from '../../../core/helpers/generate_jwt';

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const user = await User.findOne({
        where: {email}
    })

    if(!user) return res.status(404).json({
        msg: `El correo ${email} no existe`
    })

    if(!bcryptjs.compareSync(password, user.password)) return res.status(400).json({
        msg: 'La contraseña es incorrecta'
    })
    const token = await generateJWT(user.id)
    return res.json({
        user,
        token
    })
}