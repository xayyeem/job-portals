const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String, //url to company logo,
        default: "https://www.shutterstock.com/image-vector/circle-business-logo-company-name-260nw-1922534714.jpg"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //reference to User model to store company owner's id,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Company', companySchema);