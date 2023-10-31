const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String}
})

module.exports = mongoose.model(`User`, userSchema);