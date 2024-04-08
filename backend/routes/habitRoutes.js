const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {verifyToken } = require('../services/verifyServices')

router.put('/addHabit', verifyToken, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId)
        const { name, description, completionStatus, frequency } = req.body;
        const associatedUser = await User.findById( userId )
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

        res.status(201).json({ message: "Habit added succesfully" })
    } catch (error) {
        console.error("Error adding habit,", error)
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/getHabits', verifyToken, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId)
        console.log(user)
        if (!user) {
            console.log("Bad");
            return res.status(400).json({ message: "Associated user not found" })
        }
        console.log(user.habits)
        res.json({
            message: "Habits retrieved succesfully",
            habits: user.habits
        })
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.put('/updateHabit', verifyToken, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId)
        const { name, newName, description, completionStatus, frequency } = req.body;
        console.log(user)
        if (!user) {
            console.log("Bad");
            return res.status(400).json({ message: "Associated user not found" })
        }
        let newHabit = {
            name: newName,
            description: description,
            completionStatus, completionStatus,
            frequency: frequency
        }
        let habitFound = false;
        for (let i = 0; i < user.habits.length; i++) {
            console.log(user.habits[i].name, name)
            if (user.habits[i].name == name) {
                user.habits[i] = newHabit;
                habitFound = true;
                break;
            }
        }
        if (!habitFound) {
            return res.status(400).json({ message: "Habit of requested name not found" })
        }
        await user.save();
        res.json({
            message: "Habits changed succesfully",
            habits: user.habits
        })
    } catch (error) {
        console.error("Error", error)
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.delete('/deleteHabit', verifyToken, async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId)
        const { habitName } = req.body;
        console.log(user)
        if (!user) {
            console.log("Bad");
            return res.status(400).json({ message: "Associated user not found" })
        }
        let numHabits = user.habits.length;
        let habitFound = false;
        for (let i = 0; i < user.habits.length; i++) {
            console.log(user.habits[i].name, habitName)
            if (user.habits[i].name == habitName) {
                user.habits.splice(i, 1);
                habitFound = true;
                break;
            }
        }
        if (!habitFound) {
            return res.status(400).json({ message: "Habit of requested name not found" })
        }
        await user.save();

        let numNewHabits = user.habits.length;
        if (numNewHabits >= numHabits) {
            return res.status(400).json({ message: "Habit not deleted correctly" })
        }
        
        res.json({
            message: "Habit deleted succesfully",
            habits: user.habits
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;