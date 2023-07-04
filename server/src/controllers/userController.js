import Jwt  from'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {prisma} from '../client.js'

export const getUser = async (req, res) => {
    try {
        const { user_id, username, email } = await prisma.users.findUnique({
            where: {
                user_id: req.user.user_id
            }
        })
        res.status(200).json({
            user_id,
            username,
            email
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

// Regester new user
export const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body
        // Check if user is already registered
        const userRegistered = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        if(userRegistered) {
            res.status(400).json({
                message: 'User is already registered'
            })
            throw new Error('User is already registered')
        }
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // Create user 
        const user = await prisma.users.create({
            data: {
                user_id: generateID(1, 100000000),
                username: username,
                password: hashedPassword,
                email: email
            }
        })
        if(user) {
            res.status(201).json({
                user: user,
                token: generateToken(user.user_id)
            })
        } else {
            res.status(400).json({
                message: 'Invalid user data'
            })
            throw new Error('Invalid user data')
        }
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        // Check for user email
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        if(user && (bcrypt.compare(password, user.password))) {
            res.status(200).json({
                user: user,
                token: generateToken(user.user_id)
            })
        } else {
            res.status(400).json({
                message: 'Incorrect email or password'
            })
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await prisma.users.delete({
            where: {
                user_id: req.params.user_id
            }
        })
        if(!user) {
            res.status(400).send('User not found')
        } else {
        if(user.user_id.toString() !== req.user.user_id.toString()) {
            res.status(401).send('User not authorized')
        }
        await user.remove()
        res.status(200).send(`Deleted User ${req.params.user_id}`)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

//Generate JWT
export const generateToken = (id) => {
    return Jwt.sign({ id }, process.env.secret, {
        expiresIn: '1d'
    })
}

const generateID = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }