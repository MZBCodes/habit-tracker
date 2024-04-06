const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { verifyAdmin, verifyToken } = require('../services/verifyServices')

router.get('/getUsername', verifyToken, async (req, res) => {
    const userId = req.userId;
    console.log(userId);

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.send({username: user.username})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.get('/getUsers', async (req, res) => {//TODO: Fix Security on this. use JWT to ensure it's an admin. make an internal API. used a shared secret within the code.
    try {
        const users = await User.find();
        res.json(users);
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.put('/updateUser', verifyToken, async (req, res) => {
    const userId = req.userId;
    const { userId: updatedUserId, newEmail, newPassword } = req.body;
    console.log(userId, updatedUserId);

    if (userId != updatedUserId) {
        return res.status(403).json({ error: 'Forbidden: Authorization Error' });
    }
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user's email if provided
        if (newEmail) {
            user.email = newEmail;
        }

        if (newPassword) {
            user.password = newPassword;
        }

        await user.save();
        res.json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error("Error occured: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

router.delete('/deleteUser', verifyToken, async (req, res) => {
    const userId = req.userId;
    const { userId: updatedUserId} = req.body;
    console.log(userId, updatedUserId);

    if (userId != updatedUserId) {
        return res.status(403).json({ error: 'Forbidden: Authorization Error' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.deleteOne({ _id: userId})
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error("Error deleting user: ", error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

router.get('/internal/getUsers', async (req, res) => {

})

module.exports = router;