const Company = require('../models/companyModel')


exports.registerCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const userId = req.id; // userId from the authenticated user

        // Check if company name is provided
        if (!name) {
            return res.status(400).json({
                message: "Please enter company name",
                success: false
            });
        }

        // Check if company with the same name already exists
        let existingCompany = await Company.findOne({ name });

        // If company already exists, return an error
        if (existingCompany) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }

        // Create a new company document with userId
        const company = await Company.create({
            name,
            description,
            website,
            location,
            userId,  // Make sure userId is passed
        });

        return res.status(200).json({
            message: "Company registered successfully",
            success: true,
            data: {
                _id: company._id,
                name: company.name,
                description: company.description,
                website: company.website,
                location: company.location
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};



exports.getAllCompany = async (req, res) => {
    try {
        const userId = req.id
        const company = await Company.find({ userId })
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company found successfully",
            success: true,
            data: company
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company found successfully",
            success: true,
            data: company
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body
        const file = req.file
        const companyId = req.params.id
        // cloudinary come here

        const company = Company.findById(companyId)
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        const updateData = {}
        if (name) updateData.name = name
        if (description) updateData.description = description
        if (website) updateData.website = website
        if (location) updateData.location = location

        const UpdatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true })
        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            data: {
                _id: UpdatedCompany._id,
                name: UpdatedCompany.name,
                description: UpdatedCompany.description,
                website: UpdatedCompany.website,
                location: UpdatedCompany.location,
                logo: UpdatedCompany.logo
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}