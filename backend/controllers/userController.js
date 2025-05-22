import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";
import userModel from '../models/userModel.js';
// import User from '../models/userModel.js'; // Assuming you have a User model


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const loginUser = async (req, res) => {

    try{
        const {email, password} = req.body;

         const user = await userModel.findOne({email});
         if(!user){
            return res.json({success:false, message: "user does not exist"})
         }

         const isMatch = await bcrypt.compare(password, user.password);

         if (isMatch){
     const token = createToken(user._id);
     return res.json({success:true, token})
         }

         else{
          res.json({success:false, message: 'Invalid credentials'})
         }
    }catch(error){
      console.log(error);
    res.json({success:false, message: error.message})

    }

}

//Route for user registration

const registerUser = async (req,res) => {
 try{
     
const {name, email, password } = req.body;

// checking user already exist or not

const exist = await userModel.findOne({email});
if(exist){
    return res.json({success:false, message: "user already exist"})
}

// validating email format and strong format
  if(!validator.isEmail(email)){
    return res.json({success:false, message: "please enter a valid email"})
  }
  if(password.length < 8){
    return res.json({success:false, message: "please enter a strong password"})
  }

   // hashing password

   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)

   const newUser = new userModel({
    name,
    email,
    password: hashedPassword
   })

   const user= await newUser.save()

   const token = createToken(user._id)

   res.json({success:true,token})

 }catch(error){
    console.log(error);
    res.json({success:false, message: error.message})

 }
}

// routr for Admin logion


const adminLogin = async (req,res) => {
  try {
    const { email, password } = req.body;

    console.log("Received email:", email);
    console.log("ADMIN_EMAIL env var:", process.env.ADMIN_EMAIL);
    console.log("JWT_SECRET is set:", !!process.env.JWT_SECRET);

    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export {loginUser,registerUser,adminLogin};