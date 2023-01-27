import express from 'express'
import { getUser, postUser, putUser, deleteUser } from '../../controllers/users/userController' 
const router = express.Router()

router.get('/', getUser)
router.post('/', postUser)
router.put('/', putUser)
router.delete('/', deleteUser)

export default router