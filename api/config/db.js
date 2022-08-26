import mongoose from "mongoose";




// conncetion

export const mongoConnection = async () => {
    try {
        const connection = await  mongoose.connect(process.env.MONGO_STRING)
        console.log(`MONGODB is connected successfully`.bgGreen);
    } catch (error) {
        console.log(error);
    }
}
