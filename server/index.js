import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import userRoutes from './src/routes/userRoutes.js'
import customerRoutes from './src/routes/customerRoutes.js'
import estimateRoutes from './src/routes/estimateRoutes.js'

dotenv.config()

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/users', userRoutes)
app.use('/customers', customerRoutes)
app.use('/estimates', estimateRoutes)

const  CONNECTION_URL = process.env.Mongo_URL
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

mongoose.connect(CONNECTION_URL)
    .then(() => console.log('Mongo Connected'))
    .catch((error) => console.log(error.message))
