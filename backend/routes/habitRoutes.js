const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {verifyAdmin, verifyToken} = require('../services/verifyServices')

router.put('/addHabit', verifyToken, async (req, res) => {
    console.log("Trying to Add Habit");
    try {
        const { userEmail, name, description, completionStatus, frequency } = req.body;
        const associatedUser = await User.findOne({ email: userEmail })
        const allUsers = await User.find();
        // console.log(allUsers);
        // console.log(userEmail)
        // console.log(associatedUser)
        if (!associatedUser) {
            return res.status(400).json({ message: "Associated user not found" })
        }
        console.log(associatedUser)
        const habitNames = associatedUser.habits.map(x => x.name);
        console.log(habitNames)
        if (habitNames.includes(name)) {
            return res.status(400).json({ message: "Habit with that name already exists" })
        }
        console.log(name, associatedUser.habits)
        associatedUser.habits.push({
            name: name,
            description: description,
            completionStatus, completionStatus,
            frequency: frequency
        })
        console.log(associatedUser.habits)
        await associatedUser.save();

        res.response(201).json({ message: "Habit added succesfully" })
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/getHabits', verifyToken, async (req, res) => {
    console.log("Trying to get Habit");
    try {
        const { email } = req.body;
        console.log(email)
        const associatedUser = await User.findOne({ email })
        console.log(associatedUser)
        if (!associatedUser) {
            console.log("Bad");
            return res.status(400).json({ message: "Associated user not found" })
        }
        console.log(associatedUser.habits)
        res.json({
            message: "Habits retrieved succesfully",
            habits: associatedUser.habits
        })
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('./updateHabit', verifyToken, async (req, res) => {
    try {
        const { email, habitName, description, completionStatus, frequency} = req.body;
        console.log(email)
        const associatedUser = await User.findOne({ email })
        console.log(associatedUser)
        if (!associatedUser) {
            console.log("Bad");
            return res.status(400).json({ message: "Associated user not found" })
        }
        let newHabit = {
            name: habitName,
            description: description,
            completionStatus, completionStatus,
            frequency: frequency
        }
        console.log(associatedUser.habits)
        let habitFound = false;
        for (let i = 0; i < associatedUser.habits; i++){
            if (associatedUser.habits[i].name == habitName) {
                associatedUser.habits[i] = newHabit;
                habitFound = true;
                break;
            }
        }
        if (!habitFound) {
            return res.status(400).json({ message: "Habit of requested name not found" })
        }
        res.json({
            message: "Habits changed succesfully",
            habits: associatedUser.habits
        })
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;