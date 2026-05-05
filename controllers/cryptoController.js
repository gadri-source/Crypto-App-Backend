import Crypto from "../models/Crypto.js";
import axios from "axios";

// get all tradable cryptocurrencies
export const getAllCryptos = async(req, res) => {
    try{
        const cryptos = await Crypto.find().sort({createdAt: -1});
        res.status(200).json({success: true, count: cryptos.length, data: cryptos});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

// sorted by 24h 24
export const getGainers = async(req, res) => {
    try{
        const gainers = await Crypto.find({change24: {$gt: 0}}).sort({change24h: -1});
        res.status(200).json({success: true, count: gainers.length, data: gainers});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}


// get most recently added
export const getNewListings = async (req, res) => {
    try{
        const newListings = await Crypto.find().sort({createdAt: -1}).limit(20);
        res.status(200).json({success: true, count: newListings.length, data: newListings});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

// add a new cryptocurrency
export const addCrypto = async (req, res) => {
    try {
        const { name, symbol, price, image, change24h } = req.body;

        if (!name || !symbol || !price || !image || change24h === undefined) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const crypto = await Crypto.create({ name, symbol, price, image, change24h });
        res.status(201).json({ success: true, message: "Cryptocurrency added successfully.", data: crypto });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
