// db.js
import mongoose from "mongoose";

let cachedConnection = null;

async function connectToDatabase(uri) {
    if (cachedConnection) {
        return cachedConnection;
    }

    const db = await mongoose.connect(uri);

    cachedConnection = db;

    return db;
}

export default connectToDatabase