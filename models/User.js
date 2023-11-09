import { Schema, model } from "mongoose";

const userScheme = new Schema({
    email: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
})

const User = model('User', userScheme)

export default User