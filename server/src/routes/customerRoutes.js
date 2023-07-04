import express from 'express'
import { getCustomer, postCustomer, putCustomer, deleteCustomer } from '../controllers/customerController.js' 
const router = express.Router()
import protect from '../middleware/authMiddeware.js'
import formatDateObj from '../middleware/formatDateObjMiddleware.js'
import formatPhoneNumber from '../middleware/formatPhoneNumberMiddleware.js'

router.get('/get', protect, getCustomer)
router.post('/add', protect, formatDateObj, formatPhoneNumber, postCustomer)
router.put('/update/:customer_id', protect, formatDateObj, formatPhoneNumber, putCustomer)
router.delete('/delete/:customer_id', protect, deleteCustomer)

export default router