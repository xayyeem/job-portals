const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String,
    }],
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    position: {
        type: Number,
        required: true,
        min: 0
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }]
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)