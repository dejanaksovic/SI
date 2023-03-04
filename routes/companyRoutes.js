const express = require('express')
const router = express.Router()
const {addCompany, deleteCompany, updateCompany, getCompanies} = require('../controllers/companyControllers')

router.get('/:id?', getCompanies)
router.post('/', addCompany)
router.put('/:id', updateCompany)
router.delete('/:id', deleteCompany)

module.exports = router