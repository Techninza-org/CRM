const express = require('express');
const router = express.Router();
const Project = require('../model/projectModel');

// Create a new project
exports.createProject = async (req, res) => {
    try {
        // console.log(req.file);
        const path = req.file?.path;
        // console.log(path);
        const newPath = path.replace('uploads\\', "");
        // console.log(newPath);
        req.body.projectImage = newPath;
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get a single project by projectId
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchProjects = async (req, res) => {
    const queries = req.query;
    if (!queries.id) {
        return res.status(400).json({ message: "id is required to search" });
    }

    try {
        const q_regex = new RegExp(queries.id, 'i');
        // console.log(q_regex);
        const proj = await Project.find({ projectName: { $regex: q_regex } });
        return res.status(200).json(proj);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};




// Update a project
exports.updateProject = async (req, res) => {
    try {
        // console.log(req.file);
        req.body.projectImage = req.file?.path;
        const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
