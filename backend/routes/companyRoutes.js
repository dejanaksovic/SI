const express = require('express')
const router = express.Router()
const {addCompany, deleteCompany, updateCompany, getCompanies} = require('../controllers/companyControllers')

//validation
const tokenValidation = require('../middleware/tokenVerify')

const {bossValidation} = require('../middleware/usersV')

//@GET /companies
//returns a list of companies or the one with the specified id
//[ADMIN, BOSS]
router.get('/:id?',tokenValidation, bossValidation, getCompanies)

//@POST /companies
//adds a new company to a database
//[ADMIN, BOSS]
router.post('/',tokenValidation, bossValidation, addCompany)

//@PUT /companies
//updates the company with the given id
//[ADMIN, BOSS]
router.put('/:id',tokenValidation, bossValidation, updateCompany)

//@DELETE /companies
//deletes the company with the given id
//[ADMIN, BOSS]
router.delete('/:id',tokenValidation, bossValidation, deleteCompany)

module.exports = router