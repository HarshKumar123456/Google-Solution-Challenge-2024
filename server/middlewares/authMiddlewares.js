function isUserAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, allow access to the next function
    }
    res.status(200).json({ success: false, message: "Unauthorized User" }); // User is not authenticated, return an error
}

export default isUserAuthenticated;
