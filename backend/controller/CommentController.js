const { response } = require('express');
const Comment = require('../model/CommentModel');
const asyncHandler = require('express-async-handler');


const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { taskId } = req.params;
  const userId = req.user._id;

  if (!text || !taskId) {
    return res.status(400).json({ message: 'Comment text and task ID are required' });
  }

  try {
    const newComment = new Comment({
      text,
      taskId,
      userId,
    });

    const savedComment = await newComment.save();
    const io = req.app.get('io');
    io.emit('newComment', savedComment);

    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment', error });
  }
});

// Export the addComment function

// Get comments for a task
const getComments = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  try {
    const comments = await Comment.find({ taskId }).populate('userId', 'name').sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});

module.exports = { addComment, getComments };
