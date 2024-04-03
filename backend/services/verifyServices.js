const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, '6daea2423d873e7422d22d4fc0bc9c311c4475f68f9c1aaa4960dd1dad56032a', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        // Extract user ID from decoded token
        req.userId = decoded.userId;
        next();
    });
};

const verifyAdmin = async (req, res, next) => {
    // Assuming you have a role field in your user schema
    if (req.user.name !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Only admin users can access this resource' });
    }
    next();
}

module.exports = {
    verifyAdmin,
    verifyToken
}