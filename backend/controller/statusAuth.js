const express = require('express');
const router = express.Router();
const ProjectStatus = require('../model/statusModel');

// Create a new project status
router.post('/project-status', async (req, res) => {
    try {
        // console.log(req.body);
        const userId = req.body.user_id
        console.log(userId);
        const { currentStatus, user_id, project_id } = req.body;
        const newProjectStatus = new ProjectStatus({ currentStatus, user_id, project_id });
        console.log(user_id);
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

module.exports = router;
