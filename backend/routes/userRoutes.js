const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.put('/getUsers', async (req, res) => {
    try {
        console.log(associatedUser)
        const habitNames = associatedUser.habits.map(x => x.name);
        console.log(habitNames)
        console.log(associatedUser.habits)
        await associatedUser.save();

        res.response(201).json({ message: "Habit added succesfully" })
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
})