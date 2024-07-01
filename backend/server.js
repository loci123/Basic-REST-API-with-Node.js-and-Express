// backend/server.js

const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = 3000;
const connectDB = require('./config/db');
const setupSwaggerDocs = require('./config/swagger');
const {  notFound,errorHandler } = require('./middleWare/errorMiddleware');
const logger = require('./config/logger');
const morgan = require('morgan');
const asyncHandler = require('express-async-handler');
const Goal = require('../backend/model/UserMode');

connectDB();

const app = express();

// Setup Swagger
setupSwaggerDocs(app);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging requests
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) }}));

// Routes
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
    logger.info('Get method called on the Entry point /user');
    try {
        const users = await Goal.find().select('-password'); // Fetch all users from the database
        res.json(users);
    } catch (error) {
        logger.error(`Error fetching users: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
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
    logger.info('Post method called on the Entry point /user');
    try {
        const goal = await Goal.create({
            email: req.body.email,
            name: req.body.name,
        });
        res.status(200).json(goal);
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
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
    logger.info(`Put method called on the Entry point /user/${userId}`);
    if (!userId) {
        logger.warn('User ID is required');
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const { name, email } = req.body;
        const user = await Goal.findByIdAndUpdate(userId, { name, email }, { new: true });
        if (!user) {
            logger.warn('User not found');
            res.status(404);
            throw new Error('User not found');
        }
        res.json(user);
    } catch (error) {
        logger.error(`Error updating user: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
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
    logger.info(`Delete method called on the Entry point /user/${userId}`);
    if (!userId) {
        logger.warn('User ID is required');
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await Goal.findByIdAndDelete(userId);
        if (!user) {
            logger.warn('User not found');
            res.status(404);
            throw new Error('User not found');
        }
        res.json({ message: `User number ${userId} deleted!` });
    } catch (error) {
        logger.error(`Error deleting user: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
}));

// Not found middleware
app.use(notFound);
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
