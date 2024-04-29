const express = require('express');
const router = express.Router();
const Employee = require('../model/employeeModel');
const { upload } = require('../utils/multerConfig');


// Create a new employee
router.post('/employees', upload.single("employeeImage"), async (req, res) => {
    try {
        // console.log(req.file);
        const path = req.file?.path;
        // console.log(path);
        const newPath = path.replace('uploads\\', "");
        // console.log(newPath);
        req.body.employeeImage = newPath;
        const employee = new Employee(req.body);
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Get a single employee
router.get('/employees/:employeeId', async (req, res) => {
    try {
        const employee = await Employee.findOne({ employeeId: req.params.employeeId });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/search", async (req, res) => {
    const queries = req.query;
    if (queries.hasOwnProperty('id') === false) {
        return res.status(200).json({ message: "id is require to search" })
    }
    const q_regex = new RegExp(queries.id, 'i');
    console.log(q_regex);
    const emps = await Employee.find({ employeeName: { $regex: q_regex } });
    // const emps = await Employee.find({ $or: [{ employeeId: { regex: q_regex } }, { employeeName: { regex: q_regex } }] })
    if (emps) {
        return res.status(200).json(emps);
    }
    console.log(queries);
    return res.sendStatus(500);
})



// Update an employee
router.put('/employees/:employeeId', upload.single("employeeImage"), async (req, res) => {
    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { employeeId: req.params.employeeId },
            req.body,
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Delete an employee
router.delete('/employees/:employeeId', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.employeeId)
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
