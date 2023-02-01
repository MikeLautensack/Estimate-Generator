import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

import userRoutes from './routes/userRoutes'
import customerRoutes from './routes/customerRoutes'
import estimateRoutes from './routes/estimateRoutes'

const app = express()

app.use('/users', userRoutes)
app.use('/customers', customerRoutes)
app.use('/estimates', estimateRoutes)

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const  CONNECTION_URL = 'mongodb+srv://MikeL:MikeL123@cluster0.hmn9a56.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewURLParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)

