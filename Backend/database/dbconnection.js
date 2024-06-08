import mongoose from 'mongoose';

export const dbconnect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "JOB_APP",
        // serverSelectionTimeoutMS: 5000,
        // socketTimeoutMS: 45000,
    }).then(() => {
        console.log("connected to database :)")
    }).catch((err) => {
        console.log(`internal server error ${err}`)
    })
}