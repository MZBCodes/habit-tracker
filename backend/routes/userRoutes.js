const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {verifyAdmin, verifyToken} = require('../services/verifyServices')

router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find();    
        res.json(users);
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/internal/getUsers', async (req, res) => {
    
})

module.exports = router;