import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "../server/utils/authStrategies.js";

const app = express();
const port = process.env.PORT || 8000;

// Connecting to database
connectDB();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// Route accessed logger
app.use((req, res, next) => {
    console.log(`In server Accessing route: ${req.method} ${req.path} at ${new Date()}`);
    next();
});


// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use passport session

// Routes
app.use("/auth", authRoutes);

app.get("/access",(req,res) => {
    if(req.isAuthenticated()){
        return res.send("Auth");
    }
    return res.send("UnAuth");
});

app.listen(port, () => {
    console.log(`Server up and running on the port : ${port}`);
})