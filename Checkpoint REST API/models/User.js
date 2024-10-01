// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User name
    email: { type: String, required: true, unique: true }, // User email (must be unique)
    age: { type: Number, required: true }, // User age
});

// Export the User model
module.exports = mongoose.model('User', userSchema);