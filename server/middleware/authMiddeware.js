import jwt  from'jsonwebtoken'
import userModel from "../models/userModel.js";

const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')

            // verify toekn
            const decoded = Jwt.verify(token, secret,)

            // Get user from the token
            req.user = await userModel.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')

        }
    }

    if(!token) {
        res. status(401)
        throw new Error('Not authorized, no token')
    }
}

export default protect