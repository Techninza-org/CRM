const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeUserSchema = new Schema({
    employeeName: {
        type: String,
        required: true,
    },
    employeeCompany: {
        type: String,
        required: true
    },
    employeeImage: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
});

const EmployeeUser = mongoose.model("EmployeeUser", employeeUserSchema);

module.exports = EmployeeUser;