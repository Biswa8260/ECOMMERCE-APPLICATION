import express from 'express'
import {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus} from '../controllers/ordercontroller.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import pkg from 'jsonwebtoken';
const { verify } = pkg;
const orderRouter = express.Router()

orderRouter.post('list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment Features

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter
