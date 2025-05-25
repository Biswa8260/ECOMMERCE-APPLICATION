import jwt from 'jsonwebtoken'

const authUser = async (req,res, next) => {
    let token = req.headers.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.json({ success: false, message: 'Not Authorised LOG In Again'})
    }
    try {
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser