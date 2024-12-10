const mongoose = require('mongoose')

const dbConnect = async () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to MongoDB')
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    })
}

module.exports = dbConnect