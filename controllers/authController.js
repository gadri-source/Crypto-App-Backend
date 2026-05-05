import jwt from "jsonwebtoken";
import User from "../models/User.js";


const sendToken = (res, user) =>{
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

res.cookie(
    'token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24
    })

    return token;
}


export const registerUser = async (req, res) =>{
    try{
        const {name, email, password}  = req.body;

        if(!name || !password || !email){
            return res.status(400).json({message: "All fields are required"});
        }

const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message: "User already exists"})
        }

        const user = await User.create({
            name,
            email,
            password
        })

        const token = sendToken(res, user);

        return res.status(201).json({
            success: true,
            message: "Account successfully created",
            token,
            user: {id: user._id, name: user.name, email: user.email}
        })

    }catch(error){
        return res.status(500).json({success: false, message: "Server Error"});
        
    }
}

export const loginUser = async (req, res) =>{
    try{
        const {password, email}  = req.body;

        if(!password || !email){
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({email});
        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }

        const token = sendToken(res, user);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user:{id: user._id, name: user.name, email: user.email}
        })
    }catch(error){
        res.status(500).json({message: "Server error"})
    }
}

export const logoutUser = async (req, res) =>{
    res.cookie('token', '', {httpOnly: true, expires: new Date(0), sameSite: "strict"});
    return res.status(200).json({success: true, message: "Logout Successful"});
};