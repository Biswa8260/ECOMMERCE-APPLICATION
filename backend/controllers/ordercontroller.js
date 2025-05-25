import orderModel from "../models/ordermodel.js";
import userModel from "../models/userModel.js";

//  placing order using cash on delivery method

const placeOrder = async (req,res) => {
   try {
    const { userId, items, amount, address }= req.body;

    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "COD",
        payment:false,
        date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId,{cartData:{}})

    res.json({success:true,message:"order Placed"})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.messageJJJ})
    
   }
}

//  placing order using  stripe method
const placeOrderStripe = async (req,res) => {
    
}


//  placing order using Razorpay method
const placeOrderRazorpay = async (req,res) => {
    
}

// All Orders Data for Admin pannel
const allOrders = async (req,res) => {

}

// user Orders Data for frontend
const userOrders = async (req,res) => {

}
// update order status from Admin pannel
const updateStatus = async (req,res) => {

}

export  {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}