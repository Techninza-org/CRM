const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    currentStatus: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Project"
    },
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Task"
    },

}, { timestamps: true });

const ProjectStatus = mongoose.model('ProjectStatus', statusSchema);

module.exports = ProjectStatus;
