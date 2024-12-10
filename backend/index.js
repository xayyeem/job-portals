const express = require('express')
require('dotenv').config()
const cookieparser = require('cookie-parser')
const cors = require('cors')
const dbConnect = require('./config/db')
const app = express()

// routes
const userRoute = require('./routes/authRoutes')
const companyRoute = require('./routes/companyRoute')
const jobRoute = require('./routes/jobRoute')
const applicationRoute = require('./routes/applicationRoutes')


// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())
const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption))


// api 
app.use('/api/v1/users', userRoute)
app.use('/api/v1/companies', companyRoute)
app.use('/api/v1/jobs', jobRoute)
app.use('/api/v1/applications', applicationRoute)

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
    dbConnect()
})