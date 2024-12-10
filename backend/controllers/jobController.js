const Job = require('../models/jobModel')


// admin post job
exports.postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body
        const userId = req.id
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            createdBy: userId,
            company: companyId
        })
        return res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job
        })
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while posting the job" + error.message,
            success: false,

        })
    }
}

exports.getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        }
        const job = await Job.find(query).populate('company').sort({ createdAt: -1 })   //hold
        if (!job) {
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            data: job
        })
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching jobs",
            success: false,
            error
        })
    }
}


// for students
exports.getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId)  //hold
        if (!job) {
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Job fetched successfully",
            success: true,
            job
        })
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching job by ID",
            success: false,
            error
        })
    }
}


// how many job admin posted

exports.getAdminJobs = async (req, res) => {
    try {
        const userId = req.id //admin id
        const jobs = await Job.find({ createdBy: userId })
            .populate('company')    // Reference to Company
            .populate({
                path: 'createdBy',
                select: '-password'
            })  // Reference to User
            .sort({ createdAt: -1 });  //hold
        if (!jobs) {
            return res.status(404).json(
                {
                    message: "No jobs found",
                    success: false
                }
            )
        }
        return res.status(200).json({
            message: "Jobs fetched successfully by admin",
            success: true,
            data: jobs
        })
    } catch (error) {
        return res.status(500).json(
            {
                message: "An error occurred while fetching admin jobs" + error.message,
                success: false,

            }
        )
    }
}