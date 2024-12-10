const express = require('express')

const router = express.Router()
const isAuth = require('../middlewares/authMiddleware') // Import the isAuth middleware


const { register, login, logout, updateProfile } = require('../controllers/userController')

router.post('/register', register)
router.post('/login', login)
router.patch('/profile/update', isAuth, updateProfile)
router.get('/logout', logout)

module.exports = router