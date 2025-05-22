import express from 'express';
import cors from 'cors';
import 'dotenv/config';
// import mongoose from 'mongoose';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
// App config
const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// Middle ware

app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:5173',
// }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Api Endpoint

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
