import express from 'express'
import { getCustomer, postCustomer, putCustomer, deleteCustomer } from '../controllers/customerController.js' 
const router = express.Router()
import protect from '../middleware/authMiddeware.js'


router.get('/get', protect, getCustomer)
router.post('/add', protect, postCustomer)
router.put('/update/:id', protect, putCustomer)
router.delete('/delete/:id', protect, deleteCustomer)

export default router