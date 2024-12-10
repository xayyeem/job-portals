const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: {
            type: String
        },
        skills: {
            type: [String]
        },
        resume: {
            type: String //url to resume file
        },
        resumeOrignalName: {
            type: String //original name of resume file
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto: {
            type: String,//url to profile photo file
            default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
        }
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)