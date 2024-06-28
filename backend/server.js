const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = 3000;
const connectDB = require('./config/db');
const setupSwaggerDocs = require('./config/swagger');
connectDB();

const Goal = require('../backend/model/UserMode');
const asyncHandler = require('express-async-handler');

const app = express();
setupSwaggerDocs(app); // Setup Swagger

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/userRoutes'));



/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/user', asyncHandler(async (req, res) => {
    console.log('/***********\nGet method called on the Entry point /user\n***********/\n');
    const users = await Goal.find().select('-password'); // Fetch all users from the database
    res.json(users);
}));

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */
app.post('/user', asyncHandler(async (req, res) => {
    console.log('/***********\nPost method called on the Entry point /user\n***********/\n');
    const goal = await Goal.create({
        email: req.body.email,
        name: req.body.name,
    });
    res.status(200).json(goal);
}));

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */
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

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error happened
 */
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
