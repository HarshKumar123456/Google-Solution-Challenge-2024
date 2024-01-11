import express from "express";
import bodyParser from "body-parser";

import passport from "../utils/authStrategies.js";


const authRouter = express.Router();

authRouter.use(bodyParser.urlencoded({ extended: true }));

/**
 * @authRouter /auth/google
 * @description login user by google
 * @access public
 */
authRouter.get("/google", passport.authenticate("google", { scope: ["profile"] }));


/**
 * @authRouter /auth/google/callback
 * @description take logged user to signed in page view
 * @access protected
 */
authRouter.get("/google/secrets", await passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        const googleId = req.user.googleId;
        const mongoDbId = req.user._id;
        // Successful authentication, redirect home.
        console.log(`User is authenticated with OAuth2.0 Google and UserId is ${googleId} and MongoDB Id is ${mongoDbId}`);
        // console.log(req);
        // res.status(200).json({message: "User is authenticated",userId: mongoDbId,registerStatus: true});
        res.redirect(`${process.env.FRONT_END_URL}`);
    });

export default authRouter;