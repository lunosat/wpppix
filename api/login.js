import connectToDatabase from "../config/db.js";
import User from "../models/User.js";

export default async function handler (req, res) {
    const { DB_URI } = process.env

    try {
        console.log(DB_URI)
        await connectToDatabase(DB_URI)

        const { email } = req.body 

        if(email === 'demo@demo.com'){
            localStorage.setItem('isDemo', true)
        }

        console.log(email)
        const user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}