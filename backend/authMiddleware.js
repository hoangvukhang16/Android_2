const jwt = require('jsonwebtoken');

// Middleware to authenticate a token
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token from authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;  // Store user ID in request object for further use
        next();  // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
