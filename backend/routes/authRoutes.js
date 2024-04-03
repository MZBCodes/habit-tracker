const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const habits = [];

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ username, email, password, habits });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
    console.log(newUser);
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const habits = [];

    //check if signin works.
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser || (!await bcrypt.compare(password, existingUser.password))) {
      console.log("Sign-in failed from: ", email, password)
      return res.status(400).json({ message: 'Email or Password is incorrect' });
    }

    const token = jwt.sign({ userId: existingUser._id }, '6daea2423d873e7422d22d4fc0bc9c311c4475f68f9c1aaa4960dd1dad56032a', {expiresIn: '1h'});
    res.status(201).json({ message: 'Signin successful', token: token })

  } catch (err) {
    console.error('Error signing in:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;