const express = require('express')
const router = express.Router();

const {getJobs, updateJob, deleteJob, addJob} = require('../controllers/jobControllers')

router.get('/:id?', getJobs)

router.post('/', addJob)

router.put('/:id', updateJob)

router.delete('/:id', deleteJob)

module.exports = router