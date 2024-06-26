const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = 3000;
const connectDB = require('./config/db');
connectDB();

const Goal = require('../backend/model/UserMode');
const asyncHandler = require('express-async-handler');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users',require('./routes/userRoutes'))
// GET @ /user
app.get('/user', asyncHandler(async (req, res) => {
    console.log('/***********\nGet method called on the Entry point /user\n***********/\n');
    const users = await Goal.find(); // Fetch all users from the database
    res.json(users);
}));

// POST @ /user
app.post('/user', asyncHandler(async (req, res) => {
    console.log('/***********\nPost method called on the Entry point /user\n***********/\n');
   const goal=await Goal.create({
    email:req.body.email,
    name: req.body.name,
   })
   res.status(200).json(goal)
}));

// PUT @ /user/:id
app.put('/user/:id', asyncHandler(async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('***********/\nPut method called on the Entry point /user\n***********/\n');
    const { name, email } = req.body;
    const user = await Goal.findByIdAndUpdate(userId, { name, email }, { new: true });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json(user);
}));

// DELETE @ /user/:id
app.delete('/user/:id', asyncHandler(async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('***********/\ndelete method called on the Entry point /user\n***********/\n');
    const user = await Goal.findByIdAndDelete(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json({ message: `User number ${userId} deleted!` });
}));

app.listen(port, () => console.log(`Server is started on port ${port}`));
