import express from 'express'
import { getEstimate, postEstimate, putEstimate, deleteEstimate } from '../controllers/estimateController.js' 
const router = express.Router()
import protect from '../middleware/authMiddeware.js'
import formatDateObj from '../middleware/formatDateObjMiddleware.js'
import formatPhoneNumber from '../middleware/formatPhoneNumberMiddleware.js'

router.get('/get', protect, getEstimate)
router.post('/add', protect, formatDateObj, formatPhoneNumber, postEstimate)
router.put('/update/:estimate_id', protect, formatDateObj, formatPhoneNumber, putEstimate)
router.delete('/delete/:estimate_id', protect, deleteEstimate)

export default router