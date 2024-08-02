const mongoose = require('mongoose');

const AccessSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    access: {
        type: [String],
        required: true
    }
});

const Access = mongoose.model('CRMController', AccessSchema);

module.exports = Access;
