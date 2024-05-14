const express = require('express');
const Task = require('../model/taskModel');
const jwt = require('jsonwebtoken')


// Create a new task
exports.createTask = async (req, res) => {
  try {
    // console.log(req.file);
    const path = req.file?.path;
    // console.log(path);
    const newPath = path.replace('uploads\\', "");
    // console.log(newPath);
    const taskAssigner = req.body.taskAssignPerson;
    const filteredTaskAssigner = taskAssigner.filter((task) => task !== "");
    req.body.taskImages = newPath;
    const task = new Task({ ...req.body, taskAssignPerson: filteredTaskAssigner });
    // console.log(task);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('taskAssignPerson');
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
