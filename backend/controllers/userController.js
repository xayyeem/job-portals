const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'Please fill all fields',
                success: false
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'Email already exists',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })
        return res.status(200).json({
            message: 'User registered successfully',
            success: true,
            data: newUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password',
                success: false
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false
            })
        }
        if (role !== user.role) {
            return res.status(401).json({
                message: 'Unauthorized access',
                success: false
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `welcome back ${user.fullName}`,
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            message: "error while signin " + error.message,
            success: false
        })
    }

}

exports.logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', "", { maxAge: Date.now() - 1 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: "error while logging out " + error.message,
            success: false
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        console.log("req ki body" + req.body)
        const { fullName, email, phoneNumber, bio, skills } = req.body
        const file = req.files
        const userId = req.id //middleware se ayega

        // cloudinary here comes

        const updatedUser = {}
        if (fullName) updatedUser.fullName = fullName
        if (email) updatedUser.email = email
        if (phoneNumber) updatedUser.phoneNumber = phoneNumber
        if (bio) updatedUser.bio = bio
        if (skills) updatedUser.skills = skills ? skills.split(",") : [];

        // resume come here

        const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true })

        return res.status(400).json({
            message: "Profile updated successfully",
            success: true,
            data: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                bio: user.bio,
                skills: user.skills
            }

        })
    } catch (error) {
        return res.status(400).json({
            message: "error while updating profile " + error.message,
            success: false
        })
    }
}