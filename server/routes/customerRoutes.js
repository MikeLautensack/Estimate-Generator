import express from 'express'
import { getCustomer, postCustomer, putCustomer, deleteCustomer } from '../controllers/customerController.js' 
const router = express.Router()


router.get('/getcustomer', getCustomer)
router.post('/postcustomer', postCustomer)
router.put('/putcustomer', putCustomer)
router.delete('/deletecustomer', deleteCustomer)

export default router