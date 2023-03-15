import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    id: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userModel'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: String,
    address: String,
})

const customerModel = mongoose.model('customerModel', customerSchema)
export default customerModel