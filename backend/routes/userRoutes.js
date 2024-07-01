// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { RegisterUser, loginUser, GetUser, GetAllUsers } = require('../controller/userController');
const { NotFoundError } = require('../utils/errors');
const { Protect, AdminProtect } = require('../middleWare/authMiddleware');


///Now applying Try and catch block using customm errors
router.post('/register', async (req, res, next) => {
    try {
        await RegisterUser(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/login', Protect,async (req, res, next) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/me', Protect, async (req, res, next) => {
    try {
        await GetUser(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/admin/getUsers', Protect, AdminProtect, async (req, res, next) => {
    try {
        await GetAllUsers(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
