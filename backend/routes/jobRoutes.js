const express = require('express')
const router = express.Router();

//controllers
const {getJobs, updateJob, deleteJob, addJob, signWorker, setWorker, confirmJob, markJobDone} = require('../controllers/jobControllers')

//validation
const tokenValidation = require('../middleware/tokenVerify')
const { bossValidation } = require('../middleware/usersV')

//@GET /jobs
//Returns the list of all the jobs or a job with specific id
//[]
router.get('/:id?', tokenValidation, getJobs)

//@POST /jobs
//Adds a new job 
//[ADMIN, BOSS]
router.post('/', tokenValidation, bossValidation, addJob)

//@PUT /jobs
//updates the job with the given id
//[ADMIN, BOSS]
router.put('/:id', tokenValidation, bossValidation, updateJob)

//@DELETE /jobs
//deletes the job with the given id
//[ADMIN, BOSS]
router.delete('/:id', tokenValidation, bossValidation, deleteJob)

//@PUT /jobs/sign/:id
//adds a user to list of poeple that want to signup
//[]
router.put('/sign/:jobId', tokenValidation, signWorker)

//@PUT /jobs/set/:id
//sets user to do someJob
//[ADMIN, BOSS]
router.put('/set/:jobId', tokenValidation, bossValidation, setWorker)

//@PUT /jobs/mark/:id
//marks the job as done and waits for the review from boss
//[ADMIN, BOSS]
router.put('/mark/:jobId', tokenValidation, bossValidation, markJobDone)

//@PUT /jobs/confirm/:id
//confirms already done job by the client that was working on it
//[ADMIN, BOSS]
router.put('/confirm/:jobId', tokenValidation, bossValidation, confirmJob)

module.exports = router