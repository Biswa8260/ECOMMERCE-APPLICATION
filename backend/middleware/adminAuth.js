import jwt from 'jsonwebtoken';


const adminAuth = async (req,res,next) =>{
       try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("Authorization header missing or malformed");
            return res.status(401).json({success:false,message:"Not Authorized Login Again"})
        }
        const token = authHeader.split(' ')[1];
        console.log("Token received in adminAuth:", token);
        let token_decode;
        try {
            token_decode = jwt.verify(token,process.env.JWT_SECRET);
        } catch (err) {
            console.log("JWT verification failed:", err.message);
            return res.status(401).json({success:false,message:"Not Authorized Login Again"});
        }
        console.log("Decoded token in adminAuth:", token_decode);
        if(token_decode.email !== process.env.ADMIN_EMAIL){
            console.log("Token email does not match admin email");
            return res.status(401).json({success:false,message:"Not Authorized Login Again"})
        }
        next()
       } catch (error) {
         console.log(error)
         res.status(500).json({ success:false,message:error.message})
       }
}
export default adminAuth