import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    id: Number,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel'
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: String,
    address: String,
    dateCreated: Date,
    dateModified: Date,
})

const customerModel = mongoose.model('customers', customerSchema, 'Customers')
export default customerModel