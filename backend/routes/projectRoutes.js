const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectAuth');
const { project_upload } = require('../utils/multerConfig');

router.post('/projects',project_upload.single("projectImage")  ,projectController.createProject);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:projectId', projectController.getProjectById);
router.put('/projects/:projectId',project_upload.single("projectImage"), projectController.updateProject);
router.delete('/projects/:projectId', projectController.deleteProject);

module.exports = router;
