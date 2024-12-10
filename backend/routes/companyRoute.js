const express = require('express')
const router = express.Router()

const isAuth = require('../middlewares/authMiddleware')
const { registerCompany, getAllCompany, getCompanyById, updateCompany } = require('../controllers/companyController')

router.post('/registerCompany', isAuth, registerCompany)
router.get('/getAllCompany', isAuth, getAllCompany)
router.get('/getCompanyById/:id', getCompanyById)
router.patch('/update/updateCompany/:id', updateCompany)

module.exports = router