import mongoose from "mongoose";

const estimateSchema = mongoose.Schema({
    id: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userModel'
    },
    estimateName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerPhone: String,
    address: String,
    tasks: [{
        id: Number,
        taskName: String,
        taskTotal: String,
        taskDescription: String,
        subtasks: [{
            id: Number,
            taskID: Number,
            subtaskName: String,
            subtaskDescription: String,
            calcMethod: String,
            timeUnit: String,
            timePricePerUnit: Number,
            timeQuantity: Number,
            timeSubtotal: Number,
            materialsUnit: String,
            materialsPricePerUnit: Number,
            materialsQuantity: Number,
            materialsSubtotl: Number,
            unit: String,
            pricePerUnit: Number,
            quantity: Number,
            customSubtotal: Number,
            subtotal: Number,
            subtaskTotal: Number
        }]
    }]
})

const estimateModel = mongoose.model('estimateModel', estimateSchema, 'Estimates')
export default estimateModel