import connectToDatabase from "../config/db.js";
import User from "../models/User.js";
import sendMail from "../helpers/sendEmail.js";

export default async function handler (req, res) {
    const { DB_URI } = process.env

    try {
        await connectToDatabase(DB_URI)

        const email = req.body.email ||  req.body.customer.email || req.body.client_email

        await User.create({ email })

        await sendMail(email)

        res.status(200).json('ok')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}