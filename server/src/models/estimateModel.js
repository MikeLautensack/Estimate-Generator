import mongoose from "mongoose";

const estimateSchema = mongoose.Schema({
    id: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    estimateName: {
        type: String
    },
    customerName: {
        type: String
    },
    customerEmail: {
        type: String
    },
    customerPhone: String,
    address: String,
    dateCreated: Date,
    dateModified: Date,
    tasks: [],
    total: Number
})

const estimateModel = mongoose.model('estimates', estimateSchema, 'Estimates')
export default estimateModel