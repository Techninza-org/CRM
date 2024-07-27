const express = require('express');
const nodemailer = require('nodemailer');
const Project = require('../model/projectModel');
const Task = require('../model/taskModel');
const jwt = require('jsonwebtoken');
const Employee = require('../model/employeeModel');
const User = require('../userModel/adminUserModel');

// Create Task
exports.createTask = async (req, res) => {
  try {
    // Extracting paths of uploaded files
    const paths = req.files?.map(file => file.path);

    // Removing 'uploads\' from paths
    const newPaths = paths?.map(path => path.replace('uploads\\', ""));

    // Filtering task assigners to remove empty strings
    const taskAssigner = req.body.taskAssignPerson?.filter(task => task !== "");

    // Fetching emails of task assigners
    const employees = [];
    for (let i = 0; i < taskAssigner.length; i++) {
      try {
        const taskPerson = await Employee.findById(taskAssigner[i]);
        if (taskPerson) {
          employees.push(taskPerson.emailid);
        }
      } catch (err) {
        console.error(`Error fetching employee with ID ${taskAssigner[i]}: ${err.message}`);
      }
    }

    // Adding paths of uploaded images to req.body
    req.body.taskImages = newPaths;

    // Creating a new Task instance
    const task = new Task({ ...req.body, taskAssignPerson: taskAssigner });

    // Saving the task to the database
    const savedTask = await task.save();
    // console.log(savedTask);

    // Email configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ravipoddar0712@gmail.com',
        pass: 'jnrxvlqgsrjrvdbo'
      }
    });

    // Sending email to each task assigner
    const sendEmailPromises = employees.map(email => {
      const mailOptions = {
        from: 'ravipoddar0712@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'TechNinza CRM Task', // subject line
        text: `You have been assigned a new task for the project :- ${req.body.projectName}.

Assigned By :- ${req.body.assignedBy}

Due Date :- ${req.body.taskEndDate}

Priority :- ${req.body.taskPriority}
        
Description :- ${req.body.description}

Please review the task details and start working on it at your earliest convenience. You can view and manage this task by logging into our project management tool http://103.119.171.173:8000/#/employee-tasks` // plain text body
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(sendEmailPromises);

    // console.log(savedTask);
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
    const tasks_with_person = [];

    for (let i = 0; i < tasks.length; i++) {
      const project_persons = await Project.find({ projectName: tasks[i].projectName }).populate({
        path: 'taskAssignPerson',
        select: 'employeeName'
      });

      tasks[i] = tasks[i].toObject();
      tasks[i].projectMembers = project_persons;

      // Performance calculation logic
      if (tasks[i].totalPoints && tasks[i].achievedPoints) {
        tasks[i].performancePercentage = (tasks[i].achievedPoints / tasks[i].totalPoints) * 100;
      } else {
        tasks[i].performancePercentage = 0;
      }
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
    // console.log(task);
    res.json(task)
    return task;
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Update task status
exports.updateTaskStatus = async (req, res) => {
  const { isCompleted, taskStatus } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { isCompleted, taskStatus },
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

// // Add task descriptionByEmployee by Task Assignee Person (token)
// exports.addTaskDescription = async (req, res) => {
//   const author = req.headers.authorization;
  
//   if (!author || !author.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authorization header missing or incorrect format' });
//   }
  
//   const token = author.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).json({ message: 'JWT must be provided' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, "uwhdihdidjijddjwq"); // Use the provided JWT_SECRET
//     console.log("Decoded Token:", decodedToken);

//     if (!decodedToken._id) {
//       return res.status(400).json({ message: 'Token does not contain user ID (_id)' });
//     }
    
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     console.log("Task found:", task);
//     console.log("Task assigned to:", task.taskAssignPerson);
//     console.log("Request made by:", decodedToken._id);

//     // Ensure the task is assigned to the employee making the request
//     if (!task.taskAssignPerson.equals(decodedToken._id)) {
//       return res.status(403).json({ message: 'You are not authorized to update this task' });
//     }

//     task.descriptionByEmployee = req.body.descriptionByEmployee;
//     await task.save();

//     res.json(task);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };


// Get tasks summary by employee
exports.getTasksSummaryByEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    const tasksSummary = await Promise.all(
      employees.map(async (employee) => {
        const totalTasks = await Task.countDocuments({ taskAssignPerson: employee._id });
        const completedTasks = await Task.countDocuments({ taskAssignPerson: employee._id, taskStatus: 'Completed' });
        const remainingTasks = totalTasks - completedTasks;

        return {
          employeeId: employee.employeeId,
          employeeName: employee.employeeName,
          totalTasks,
          completedTasks,
          remainingTasks,
        };
      })
    );
    res.json(tasksSummary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};