import express from 'express'
import { getEstimate, postEstimate, putEstimate, deleteEstimate } from '../controllers/estimateController' 
const router = express.Router()

router.get('/', getEstimate)
router.post('/', postEstimate)
router.put('/', putEstimate)
router.delete('/', deleteEstimate)

export default router