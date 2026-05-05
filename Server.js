import dotenv from "dotenv";
dotenv.config(); // ← Must be FIRST

import express from "express";
import mongoose from "mongoose";


import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";



const app = express();

// Middlewares (cors first)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (
        origin.startsWith("http://localhost") ||
        origin === process.env.FRONTEND_URL
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", cryptoRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "Coinbase clone API is running" });
});

// Connect server to mongoose
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("Connecting to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected");

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/`);
    });

    return server;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

startServer();


