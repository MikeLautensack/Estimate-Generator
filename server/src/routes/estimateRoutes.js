import express from 'express'
import { getEstimate, postEstimate, putEstimate, deleteEstimate } from '../controllers/estimateController.js' 
const router = express.Router()
import protect from '../middleware/authMiddeware.js'

router.get('/get', protect, getEstimate)
router.post('/add', protect, postEstimate)
router.put('/update/:id', protect, putEstimate)
router.delete('/delete/:id', protect, deleteEstimate)

export default router