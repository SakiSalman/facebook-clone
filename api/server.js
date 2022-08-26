import express, { urlencoded } from "express";
import dotenv from 'dotenv'
import color from "colors";
import userRouter from './routes/user.js'
import errorHandler from "./middlewares/errrorHandler.js";
import { mongoConnection } from "./config/db.js";
import cors from 'cors';



// app inititallization
const app = express() 

// middlewares
app.use(express.json()),
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())


// dot env config
dotenv.config()

// Port import from ENV File
const port = process.env.PORT


// error handler initialization
app.use(errorHandler)

// MongoDB Conncetion
mongoConnection();

// Routes Initialiization
app.use('/api/user', userRouter)



// server listening
app.listen(port, () => {
    console.log(`Server is Running  ${port}`.bgCyan.black);
})