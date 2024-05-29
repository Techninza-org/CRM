const express = require('express');
const nodemailer = require('nodemailer');
// import Project from './../../frontend/src/pages/Project';
const Project = require('../model/projectModel');
const Task = require('../model/taskModel');
const jwt = require('jsonwebtoken');
const Employee = require('../model/employeeModel');

// Create Task
exports.createTask = async (req, res) => {
  try {
    // Extracting paths of uploaded files
    const paths = req.files?.map(file => file.path);

    // Removing 'uploads\' from paths
    const newPaths = paths?.map(path => path.replace('uploads\\', ""));
    // console.log(newPaths);

    // console.log(req.body);
    // Filtering task assigners to remove empty strings
    const taskAssigner = req.body.taskAssignPerson;

    // console.log(taskAssigner);
    const employees = [];
    for (let i = 0; i < taskAssigner.length; i++) {
      try {
        const taskPerson = await Employee.findById(taskAssigner[i]);
        employees.push(taskPerson.emailid);
      } catch (err) {
        // console.log(err);
      }
    }
    // console.log(employees);
    // console.log(taskPerson);
    const filteredTaskAssigner = taskAssigner.filter(task => task !== "");

    // Adding paths of uploaded images to req.body
    req.body.taskImages = newPaths;
    // console.log(req.body, "body");

    // Creating a new Task instance
    const task = new Task({ ...req.body, taskAssignPerson: filteredTaskAssigner });

    // Saving the task to the database
    const savedTask = await task.save();


    // Email configuration
    for (let i = 0; i < employees.length; i++) {
      const email = employees[i];
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'eladio.kutch70@ethereal.email',
          pass: 'f9HqAWq5KCBhj6U2MV'
        }
      });

      // Sending email to each task assigner
      const sendEmailPromises = filteredTaskAssigner.map(assignerEmail => {
        const mailOptions = {
          from: 'eladio.kutch70@ethereal.email', // sender address
          to: email,            // list of receivers
          subject: 'TechNinza CRM Task', // subject line
          text: `You have been assigned a new task for the project: ${req.body.projectName}` // plain text body
        };

        return transporter.sendMail(mailOptions);
      });
      await Promise.all(sendEmailPromises);

    }


    // Sending the saved task as response
    res.status(201).json(savedTask);
  } catch (error) {
    // Handling errors
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('taskAssignPerson');
    // console.log(tasks[0]);
    const tasks_with_person = [];
    for (let i = 0; i < tasks.length; i++) {
      const project_persons = await Project.find({ projectName: tasks[i].projectName }).populate({
        path: 'taskAssignPerson',
        select: 'employeeName'
      })

      tasks[i] = tasks[i].toObject();
      tasks[i].projectMembers = project_persons
      // console.log(project_persons);
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('taskAssignPerson');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.searchTask = async (req, res) => {
  const queries = req.query;
  if (!queries.id) {
    return res.status(400).json({ message: "id is required to search" });
  }

  try {
    const q_regex = new RegExp(queries.id, 'i');
    // console.log(q_regex);
    const proj = await Task.find({ projectName: { $regex: q_regex } });
    return res.status(200).json(proj);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a task
exports.updateTaskById = async (req, res) => {
  try {
    // console.log(req.file);
    req.body.taskImages = req.file?.path;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
exports.deleteTaskById = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get task by Task Assigne Person (token)
exports.getTask = async (req, res) => {
  const author = req.headers.authorization
  const decodeToken = jwt.decode(author)
  // console.log(decodeToken);
  try {
    const task = await Task.find({
      taskAssignPerson: {
        $in: [decodeToken]
      }
    }).populate("taskAssignPerson");
    res.json(task)
    return task;
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Update task status to "done"
exports.updateTaskStatus = async (req, res) => {
  const body = req.body;
  const { isCompleted } = body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { isCompleted },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

