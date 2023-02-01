import express from 'express'
import { getUser, postUser, putUser, deleteUser } from '../controllers/userController' 
const router = express.Router()

router.get('/getuser', getUser)
router.post('/postuser', postUser)
router.put('/putuser', putUser)
router.delete('/deleteuser', deleteUser)

export default router