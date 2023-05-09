const Job = require('../models/job')
const Company = require('../models/company')
const User = require('../models/user')
const mongoose = require('mongoose')

const serverError = () => {
    res.status(500).json({
        err: "Problem u serverskoj komunikaciji, pokusajte kanije ili kontaktirajte administratora"
    })
}

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
    const {type, status, price, companyId, doneDate} = req.body

    if(!companyId || !mongoose.isValidObjectId(companyId)) {
        return res.status(400).json({
            err: "Invalid input, no company id"
        })
    } 

    const company = await Company.findById(companyId)

    if (!company) {
        return res.status(404).json({
            err: "Company not found"
        })
    }

    try {
        const job = await Job.create({
            type,
            status,
            price,
            company: companyId
        })

        return res.status(201).json({
            job
        })
    }

    catch(err) {
        console.log(err)
        res.status(400).json ({
            err
        })
    }
}

const updateJob = async (req, res) => {
    const { id } = req.params
    const {type, price, status, companyId} = req.body

    try {
        const job = await Job.findByIdAndUpdate(id, {
            type,
            price,
            status,
            company: companyId
        }, {
            new: true
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

const signWorker = async (req, res) => {
    const { jobId } = req.params
    const { userId } = req.body

    let user;
    let job;

    if(!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({
            err: "Id korisnika ili posla nije validan"
        })
    }

    try {
        user = await User.findById(userId)
    }

    catch(err) {
        return serverError()
    }

    if(!user) {
        return res.status(404).json({
            err: "Izabrani korisnik ne postoji"
        })
    }

    if(user.role !== "USER") {
        return res.status(400).json({
            err: "Izabrani korisnik nije 'radnik' i ne moze se prijaviti za posao"
        })
    }
    
    try {
        job = await Job.findById(jobId)
    }

    catch(err) {
        return serverError()
    }

    if(!job) {
        return res.status(404).json({
            err: "Izabrani posao ne postoji"
        })
    }

    if(job.status !== "AVAILABLE") {
        return res.status(400).json({
            err: "Posao nije dostupan, korisnik nije u mogucnosti da se prijavi"
        })
    }

    try {
    await job.wantedBy.push(user._id)
    await job.save()
    }
    catch(err) {
        return serverError()
    }

    return res.status(200).json({
        job
    })
}

const setWorker = async(req, res) => {
    const { jobId } = req.params
    const { userId } = req.body
    let job;
    let user;

    if(!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({
            err: "Nevalidni id-evi korinsika ili posla"
        })
    }

    try {
        job = await Job.findById(jobId)
    }
    catch(err) {
        return serverError()
    }

    if(!job) {
        return res.status(400).json({
            err: "Zahtevani posao ne postoji"
        })
    }

    if(job.status !== "AVAILABLE") {
        return res.status(400).json({
            err: "Taj posao nije otvoren za rad"
        })
    }

    try {
        user = await User.findById(userId)
    }
    catch(err) {
        return serverError()
    }

    if(!user) {
        return res.status(404).json({
            err: "Zahtevani korisnik ne postoji"
        })
    }

    if(!user.role !== "USER") {
        return res.status(400).json({
            err: "Izabrani korisnik nije 'radnik' i ne moze biti zaduzen za posao"
        })
    }

    job.wantedBy = []
    job.status = "TAKEN"
    job.doneDate = new Date()
    job.doneBy = user._id
    
    try {
        await job.save()
    }
    catch(err) {
        return serverError()
    }

    return res.status(200).json(
        job
    )

}

module.exports = {
    getJobs,
    addJob,
    updateJob,
    deleteJob,
    signWorker,
    setWorker
}