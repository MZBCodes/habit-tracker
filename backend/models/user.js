const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    habits: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        completionStatus: {
            type: String,
            required: true
        },
        frequency: {
            type: String,//Either daily or weekly
            required: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    console.log('Trying to save');
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;