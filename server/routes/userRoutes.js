import express from 'express'
import { getUser, registerUser, loginUser, deleteUser } from '../controllers/userController.js' 
const router = express.Router()
import protect from '../middleware/authMiddeware.js'

router.get('/get', protect, getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/deleteuser', deleteUser)

export default router