import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string) => {
    return new Promise( (resolve, reyect) => {
        const payload = {uid}
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn:'30d'
        },(err, token) => {
            if(err) {
                console.log(err)
                reyect('No se pudo generar el JWT')
            }else{
                resolve(token)
            }
        })
    })
}