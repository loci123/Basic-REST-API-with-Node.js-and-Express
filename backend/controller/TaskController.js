  const mongoose = require('mongoose');
  const asyncHandler = require('express-async-handler');
  const Task = require('../model/TaskModel');
  const User = require('../model/UserMode');
  const NotFoundError = require('../utils/errors');

  // @desc    Add task to a member
  // @route   POST /api/tasks
  // @access  Private/Team Manager
  const addTask = asyncHandler(async (req, res) => {
    const { title, description, assignedTo, dueDate } = req.body; // Added dueDate here

    // Check if assignedTo is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
        res.status(400);
        throw new Error('Invalid user ID');
    }

    // Check if dueDate is provided and is a valid date
    if (dueDate && isNaN(Date.parse(dueDate))) {
        res.status(400);
        throw new Error('Invalid due date');
    }

    // Find the user to whom the task is assigned
    const user = await User.findById(assignedTo);
    if (!user) {
        res.status(404);
        throw new NotFoundError('User not found');
    }

    // Create the task
    const task = await Task.create({
        title,
        description,
        assignedTo: user._id, // Use the valid ObjectId
        createdBy: req.user._id, // Assuming req.user contains the authenticated user's info
        dueDate: dueDate ? new Date(dueDate) : undefined, // Assign dueDate if provided
    });

    res.status(201).json(task);
  });

  // @desc    Get all tasks
  // @route   GET /api/tasks
  // @access  Private
  const getTasks = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    // Fetch tasks assigned to the user
    const tasks = await Task.find({ "assignedTo": userId }).populate('assignedTo', 'name email');
    res.status(200).json(tasks);
  });

  const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;

    try {
      // Find the task by ID and delete it
      console.log('task ID:'+taskId)
      const task = await Task.findByIdAndDelete(taskId);

      if (!task) {
        // If task not found, return 404 Not Found error
        res.status(404);
        throw new NotFoundError('Task not found');
      }

      // If deletion is successful, return success message
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      // Handle any errors that occur during deletion
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Failed to delete task' });
    }
  });

  const getAllTasks = asyncHandler(async (req, res) => {
    // Fetch all tasks
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.status(200).json(tasks);
  });

  module.exports = {
    addTask,
    getTasks,
    deleteTask,
    getAllTasks,
  };
