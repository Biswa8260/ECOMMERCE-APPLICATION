import express from 'express';
import {listProduct,addProduct,removeProduct,singleProduct,updateProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.any(),addProduct);
productRouter.get('/list',adminAuth,listProduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/single/',singleProduct);
productRouter.post('/update', updateProduct);  // Added update route

// productRouter.get('/single/:productId', singleProduct);



export default productRouter;
