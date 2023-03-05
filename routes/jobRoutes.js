const express = require('express')
const router = express.Router();

const {getJobs, updateJob, deleteJob, addJob} = require('../controllers/jobControllers')

//validation
const tokenValidation = require('../middleware/tokenVerify')
const {adminValidation, bossValidation} = require('../middleware/usersV')

//@GET /jobs
//Returns the list of all the jobs or a job with specific id
//[]
router.get('/:id?',tokenValidation, getJobs)

//@POST /jobs
//Adds a new job 
//[ADMIN, BOSS]
router.post('/',tokenValidation, bossValidation, addJob)

//@PUT /jobs
//updates the job with the given id
//[ADMIN, BOSS]
router.put('/:id',tokenValidation, bossValidation, updateJob)

//@DELETE /jobs
//deletes the job with the given id
//[ADMIN, BOSS]
router.delete('/:id',tokenValidation, bossValidation, deleteJob)

module.exports = router