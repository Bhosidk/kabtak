const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

    // First check request header has authorisation or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token Not Found' });
    // Extract jwt token from request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        // verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request subject
        req.user = decoded
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({error: 'Invalid Token'});
    }
}

// function to generate jwt token

const generateToken = (userdata) => {
    // Generate a new JWT using user data
    return jwt.sign(userdata, process.env.JWT_SECRET, {expiresIn: 300000});
}
module.exports = {jwtAuthMiddleware, generateToken};