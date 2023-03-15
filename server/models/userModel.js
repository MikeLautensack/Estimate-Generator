import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: Number,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    phoneNumber: String
})

const userModel = mongoose.model('userModel', userSchema)
export default userModel