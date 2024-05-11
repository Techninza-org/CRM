const express = require('express');
const router = express.Router();
const ProjectStatus = require('../model/statusModel');
const jwt = require('jsonwebtoken');

// Create a new project status
router.post('/project-status', async (req, res) => {
    try {
        const { currentStatus, user_id, project_id } = req.body;
        // console.log(req.body);
        const newProjectStatus = new ProjectStatus({ currentStatus, user_id, project_id });
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
        const projectStatuses = await ProjectStatus.find().populate("user_id");
        res.json(projectStatuses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single project status
router.get('/project-status/:id', async (req, res) => {
    try {
        const projectStatus = await ProjectStatus.findById(req.params.id).populate("user_id");
        if (!projectStatus) {
            return res.status(404).json({ message: 'Project status not found' });
        }
        res.json(projectStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete project
router.delete('/project-status/:id', async (req, res) => {
    try {
        const deletedProjectStatus = await ProjectStatus.findByIdAndDelete(req.params.id);
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

        const status = await ProjectStatus.find({ user_id: decodedToken.user_id }).populate("user_id");
        res.json(status);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
