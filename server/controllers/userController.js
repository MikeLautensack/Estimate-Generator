import Jwt  from'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from "../models/userModel.js"

export const getUser = async (req, res) => {
    try {
        console.log(req.user._id)
        const { _id, username, email } = await userModel.findById(req.user._id)
        res.status(200).json({
            _id,
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
        console.log(req.body)
        const { username, password, email } = req.body
        if(!username || !password || !email) {
            res.status(400).send('Add all required fields')
            throw new Error('Add all required fields')
        }

        // Check if user is already registered
        const userRegistered = await userModel.findOne({email})

        if(userRegistered) {
            res.status(400).send('User is already registered')
            throw new Error('User is already registered')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user 
        const user = await userModel.create({
            username,
            password: hashedPassword,
            email
        })

        if(user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })

        } else {
            res.status(400).send('Invalid user data')
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
        const user = await userModel.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).send('Invalid credentials')
            throw new Error('Invalid credentials')
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)

        if(!user) {
            res.status(400).send('User not found')
        } else {
        if(user._id.toString() !== req.user._id.toString()) {
            res.status(401).send('User not authorized')
        }

        await user.remove()

        res.status(200).send(`Deleted User ${req.params.id}`)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }
}

//Generate JWT
export const generateToken = (id) => {
    return Jwt.sign({ id }, process.env.secret, {
        expiresIn: '1h'
    })
}