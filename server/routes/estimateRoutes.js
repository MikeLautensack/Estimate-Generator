import express from 'express'
import { getEstimate, postEstimate, putEstimate, deleteEstimate } from '../controllers/estimateController.js' 
const router = express.Router()

router.get('/getestimate', getEstimate)
router.post('/postestimate', postEstimate)
router.put('/putestimate', putEstimate)
router.delete('/deleteestimate', deleteEstimate)

export default router