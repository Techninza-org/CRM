const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    projectCategory: {
        type: String,
        required: true
    },
    projectImage: {
        type: String,
        // required: true
    },
    projectStartDate: {
        type: Date,
        required: true
    },
    projectEndDate: {
        type: Date
    },
    taskAssignPerson: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    taskManager: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    description: {
        type: String
    },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
