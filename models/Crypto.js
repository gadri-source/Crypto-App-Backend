import mongoose from  "mongoose";

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Crypto name is required"],
        trim: true
    },

    symbol: {
        type: String,
        required: [true, 'Symbol is required'],
        trim: true,
        uppercase: true
    },

    price: {
        type: String,
        required: [true, "Price is required"],
        minlength: [0, 'Price cannot negative']
    },

    image: {
        type: String,
        required: [true, "image URL is required"]
    },

    change24h: {
        type: Number,
        required: [true, "24h change is required"]
    },
},
    {timestamps: true}
)

const Crypto = new mongoose.model("Crypto", cryptoSchema);

export default Crypto;