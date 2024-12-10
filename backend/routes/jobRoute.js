const express = require('express')

const router = express.Router()

const isAuth = require('../middlewares/authMiddleware')
const { postJob, getAllJob, getJobById, getAdminJobs } = require('../controllers/jobController')

router.post('/postjob', isAuth, postJob)
router.get('/getalljobs', isAuth, getAllJob)
router.get('/getjobbyid/:id', isAuth, getJobById)

router.get('/getadminjobs', isAuth, getAdminJobs)

module.exports = router