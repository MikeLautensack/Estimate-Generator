import jwt  from'jsonwebtoken'
import userModel from "../models/userModel.js"

const protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]
            // verify toekn
            const decoded = jwt.verify(token, process.env.secret)

            // Get user from the token
            req.user = await userModel.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401).send('Not Authorized')
        }
    }

    if(!token) {
        res.status(401).send('Not authorized, no token')
    }
}

export default protect