const express = require('express');
const router = express.Router();
const Status = require('../model/statusModel');
const jwt = require('jsonwebtoken');

// Create a new project status
router.post('/project-status', async (req, res) => {
    try {
        const { currentStatus, user_id, project_id } = req.body;
        // console.log(req.body);
        const newProjectStatus = new Status({ currentStatus, user_id, project_id });
        // console.log(user_id);
        // console.log(project_id);
        await newProjectStatus.save();
        res.status(201).json(newProjectStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get project
router.get('/project-status', async (req, res) => {
    try {
        const projectStatuses = await Status.find().populate("user_id");
        res.json(projectStatuses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get project status by project ID
router.get('/project-status/:project_id', async (req, res) => {
    try {
        const projectStatus = await Status.find({ project_id: req.params.project_id }).populate("user_id");
        // console.log(projectStatus);
        if (!projectStatus) {
            return res.status(404).json({ message: "Project status not found" });
        }
        res.json(projectStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete project
router.delete('/project-status/:id', async (req, res) => {
    try {
        const deletedProjectStatus = await Status.findByIdAndDelete(req.params.id);
        if (!deletedProjectStatus) {
            return res.status(404).json({ message: 'Project status not found' });
        }
        res.json({ message: 'Project status deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get project by Task Assigne Person (token)
router.get('/status-token', async (req, res) => {
    const auth = req.headers.authorization;
    const decodedToken = jwt.decode(auth);

    try {
        if (!decodedToken || !decodedToken.user_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const status = await Status.find({ user_id: decodedToken.user_id }).populate("user_id");
        res.json(status);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// Create a new task status
router.post('/task-status', async (req, res) => {
    try {
        const { currentStatus, user_id, project_id, task_id } = req.body;
        const newTaskStatus = new Status({ currentStatus, user_id, project_id, task_id });
        await newTaskStatus.save();
        res.status(201).json(newTaskStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all task statuses
router.get('/task-status', async (req, res) => {
    try {
        const taskStatuses = await Status.find().populate("user_id").populate("project_id").populate("task_id");
        res.json(taskStatuses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get task status by task ID
router.get('/task-status/:task_id', async (req, res) => {
    try {
        const taskStatus = await Status.find({ task_id: req.params.task_id }).populate("user_id").populate("project_id").populate("task_id");
        if (!taskStatus) {
            return res.status(404).json({ message: "Task status not found" });
        }
        res.json(taskStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete task status
router.delete('/task-status/:id', async (req, res) => {
    try {
        const deletedTaskStatus = await Status.findByIdAndDelete(req.params.id);
        if (!deletedTaskStatus) {
            return res.status(404).json({ message: 'Task status not found' });
        }
        res.json({ message: 'Task status deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get task status by Token (for the assigned person)
router.get('/task-status-token', async (req, res) => {
    const auth = req.headers.authorization;
    const decodedToken = jwt.decode(auth);

    try {
        if (!decodedToken || !decodedToken.user_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const statuses = await Status.find({ user_id: decodedToken.user_id }).populate("user_id").populate("project_id").populate("task_id");
        res.json(statuses);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
