import express from 'express'
import { getCustomer, postCustomer, putCustomer, deleteCustomer } from '../../controllers/customers/customerController' 
const router = express.Router()


router.get('/', getCustomer)
router.post('/', postCustomer)
router.put('/', putCustomer)
router.delete('/', deleteCustomer)

export default router