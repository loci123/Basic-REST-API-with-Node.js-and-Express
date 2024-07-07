const express = require('express');
const { addTask, getTasks,deleteTask,getAllTasks } = require('../controller/TaskController');
const { Protect, teamManager } = require('../middleWare/authMiddleware');

const router = express.Router();
router.route('/getTask')
  .get(getAllTasks);
router.route('/')
  .post(Protect, teamManager, addTask);

router.route('/:userId')
  .get(Protect, getTasks);

router.route('/:taskId')
  .delete(Protect,deleteTask)



module.exports = router;
