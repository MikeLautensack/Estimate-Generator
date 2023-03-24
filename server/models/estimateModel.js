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

const estimateModel = mongoose.model('estimates', estimateSchema, 'Estimates')
export default estimateModel