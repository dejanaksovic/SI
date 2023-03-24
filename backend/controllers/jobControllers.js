const Job = require('../models/job')
const Company = require('../models/company')
const mongoose = require('mongoose')

const getJobs = async (req, res) => {
    
    const { id } = req.params

    if(id) {
        try {
            const job = await Job.findById(id)
            return res.status(400).json({
                job
            })
        }

        catch(err) {
            return res.status(200).json({
                err
            })
        }
    }

    try {
        const jobs = await Job.find()
        res.status(200).json({
            jobs
        })
    }

    catch(err) {
        return res.status(400).json({
            jobs
        })
    }
}

const addJob = async (req, res) => {
    const {type, status, price, companyId} = req.body

    if(!companyId || !mongoose.isValidObjectId(companyId)) {
        return res.status(400).json({
            err: "Invalid input, no company id"
        })
    } 

    const company = Company.findById(companyId)

    if (!company) {
        return res.status(404).json({
            err: "Company not found"
        })
    }

    try {
        const job = await Job.create({
            type,
            status,
            price
        })

        company.jobs.push(job.id)
        company.save()

        return res.status(200).json({
            job
        })
    }

    catch(err) {
        res.status(400).json ({
            err
        })
    }
}

const updateJob = async (req, res) => {
    const { id } = req.params
    const {type, price, status} = req.body

    try {
        const job = await Job.findByIdAndUpdate(id, {
            type,
            price,
            status
        })

        res.status(200).json({
            job,
        })
    }

    catch(err) {
        res.status(400).json({
            err
        })
    }
}

const deleteJob = async (req, res) => {
    const { id } = req.params

    try {
        const job = await Job.findByIdAndDelete(id)
        return res.status(200).json({
            job
        })
    }

    catch(err) {
        res.status(400).json({
            err,
        })
    }
}

module.exports = {
    getJobs,
    addJob,
    updateJob,
    deleteJob,
}