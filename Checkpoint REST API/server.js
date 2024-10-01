// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configure environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Define port

// Middleware
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));

// Import User model
const User = require('./models/User');

// Routes

// GET: Return all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Find all users
        res.json(users); // Return users as JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); // Return error message
    }
});

// POST: Add a new user to the database
app.post('/users', async (req, res) => {
    const user = new User(req.body); // Create a new user
    try {
        const savedUser = await user.save(); // Save user to database
        res.status(201).json(savedUser); // Return saved user
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return error message
    }
});

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update user
        res.json(updatedUser); // Return updated user
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return error message
    }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id); // Delete user
        res.json({ message: 'User deleted successfully' }); // Return success message
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return error message
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});