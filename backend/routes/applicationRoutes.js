const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/authMiddleware');
const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require('../controllers/applicationController');

router.post('/apply/:id', isAuth, applyJob);
router.get('/getAppliedJobs', isAuth, getAppliedJobs);
router.get('/getApplicants/:id', isAuth, getApplicants);
router.post('/updateStatus/:id', isAuth, updateStatus);

module.exports = router;
