import express from 'express';
import cors from 'cors';
import 'dotenv/config';
// import mongoose from 'mongoose';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
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
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/', (req, res) => {
    res.send('Api Working');
   
});

// Handle favicon.ico requests to avoid 500 errors
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

import { createServer } from 'http';
import { parse } from 'url';

const server = createServer((req, res) => {
  app(req, res);
});

if (process.env.VERCEL) {
  // Export the app for Vercel serverless function
}

export default app;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Environment variables:', {
    MONGODB_URI: process.env.MONGODB_URI ? 'set' : 'not set',
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME ? 'set' : 'not set',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? 'set' : 'not set',
    CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY ? 'set' : 'not set',
    PORT: process.env.PORT || 'default 4000'
  });
});
