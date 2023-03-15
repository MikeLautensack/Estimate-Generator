import jwt  from'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from "../models/userModel.js"

export const getUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

// Regester new user
export const registerUser = async (req, res) => {
    console.log('test')
    /*try {
        const { username, password, email } = req.body
        if(!username || !password || !email) {
            res.status(400)
            throw new Error('Add all required fields')
        }

        // Check if user is already registered
        const userRegistered = await userModel.findOne({email})

        if(userRegistered) {
            res.status(400)
            throw new Error('User is already registered')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user 
        const user = await userModel.create({

        })

        if(user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })

        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    } catch (error) {
        console.log(error)
    }*/
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check for user email
        const user = await userModel.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//Generate JWT
export const generateToken = (id) => {
    return Jwt.sign({ id }, 12345, {
        expiresIn: '10d'
    })
}