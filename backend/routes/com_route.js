const express = require('express');
const { addComment, getComments } = require('../controller/CommentController');
const { Protect } = require('../middleWare/authMiddleware');
const router = express.Router();

router.post('/comments/:taskId', Protect, addComment);
router.get('/comments/:taskId', Protect, getComments);

module.exports = router;
