const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskAuth');
const { task_upload } = require('../utils/multerConfig');


router.post('/tasks',task_upload.single("taskImages") ,taskController.createTask);
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.get('/pros/search', taskController.searchTask);
router.put('/tasks/:id', task_upload.single("taskImages") ,taskController.updateTaskById);
router.delete('/tasks/:id', taskController.deleteTaskById);

router.get('/author', taskController.getTask)

module.exports = router;
