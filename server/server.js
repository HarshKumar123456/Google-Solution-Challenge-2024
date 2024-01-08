import express from "express";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 8000;

// Connecting to database
connectDB();

app.listen(port,() => {
    console.log(`Server up and running on the port : ${port}`);
})