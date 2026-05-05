import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async(req, res, next) =>{
    let token;

    const authHeaders = req.headers.authorization;
    
// Checking if cookie is http-Only cookie
    if(req.cookies && req.cookies.token){
        token = req.cookies.token
    }
    else if(
        authHeaders && authHeaders.startsWith('Bearer')
    ){
        token = authHeaders.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({message: "No token provided"});
    };

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');

        if(!user){
            return res.status(401).json({message: "User does not exist"});
        }

        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({message: "Invalid token"})
    }
}

export default protect;