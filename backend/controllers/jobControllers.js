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
    const { email } = req.query

    if(id) {
        try {
            const job = await Job.findById(id)
            return res.status(400).json({
                job
            })
        }

        catch(err) {
            console.log(err)
            return res.status(200).json({
                err
            })
        }
    }

    if(email) {
        try { 
        const company = await Company.find({
            email,
        })

        if(!company)
            return res.status(400).json({
                err: "Kompanija sa tim mejlom nije pronadjena"
            })

        const jobs = await Job.find({
            companyId: company._id
        })

        if(!jobs) {
            return res.status(400).json({
                err: "Ta kompanija nema nikakve poslove"
            })
        }

        return res.status(200).json(
            jobs
        )
    }
        catch(err){
            console.log(err)
                return res.status(500).json({
                    err: "Greska pri komunikaciji sa serverom"
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
        console.log(err);
        return res.status(400).json({
            err
        })
    }
}

const addJob = async (req, res) => {
    const {type, status, price, companyId, doneDate, doneBy, isRenewable} = req.body

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

    if(status === "TAKEN") {
        let user;
        if(!doneBy) {
            return res.status(400).json({
                err: "Poslovi koji se trenutno rade moraju imati od koga su uzeti",

            })
        }

        if(!mongoose.isValidObjectId(doneBy))
            return res.status(400).json({
                err: "Id korisnika nije ispravan"
            })

        try {
            user = await User.findById(doneBy)
        }
        catch(err) {
            return res.status(500).json({
                err: "Greska pri komunijakaciji sa serverom, pokusajte ponovo ili kontaktirajte administratora ukoliko se greska ponavlja"
            })
        }

        if(!user) {
            return res.status(404).json({
                err: "Korisnik kojem zelite da dodelite posao ne postoji"
            })
        }

        if(user.role !== "USER") {
            return res.status(400).json({
                err: "Korsnik koji radi posao mora biti 'radnik'"
            })
        }
    }

    if(status === "DONE") {
        if(!doneDate) {
            return res.status(400).json({
                err: "Odradjeni poslovi moraju imati datum kada su odradjeni"
            })
        }
    }

    try {
        console.log(type)
        const job = await Job.create({
            type,
            status,
            price,
            company: companyId,
            doneDate: status !== "DONE" ? null : doneDate,
            doneBy: status === "AVAILABLE" ? null : doneBy,
            isRenewable            
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
    let job;

    if(!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            err: "Korisnik sa tim id-em ne postoji"
        })
    }

    try {
        job = await Job.findById(id)
    }

    catch(err) {
        return res.status(500).json({
            err: "Greska sa serverske strane, pokusajte ponovo kanije ili kontaktirajte administratora ukoliko kvar ne bude otklonjen"
        })
    }

    if(job.status === "DONE")
    return res.status(400).json({
        err: "Odradjeni poslovi ne mogu biti promenjeni"
    })

    try {
        job = await Job.findByIdAndUpdate(id, {
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

    if(await job.wantedBy.includes(userId)) {
        return res.status(400).json({
            err: "Korisnik koji je vec prijavljen na poslu ne moze se prijaviti opet"
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

    if(user.role !== "USER") {
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

const confirmJob = async (req, res) => {
    const { jobId } = req.params
    let job, user

    if(!mongoose.isValidObjectId(jobId)) {
        return res.status(400).json({
            err: "Neispravni id-evi"
        })
    }

    try {
        job = await Job.findById(jobId)
    }
    catch(err) {
        return res.status(500).json({
            err: "Greska pri komunikaciji sa serverom, pokusajte kasnije ili kontaktirajte administratora ukoliko se bude ponavljalo"
        })
    }

    if(!job) {
        return res.status(404).json({
            err: "Posao sa tim id-em ne postoji"
        })
    }

    job.status = "DONE"
    await job.save()
    return res.status(200).json({
        job
    })
}

const markJobDone = async (req, res) => {
    const { jobId } = req.params
    const { userId } = req.body
    let job, user;

    if(!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({
            err: "Nevalidni id-evi"
        })
    }

    try {
        job = await Job.findById(jobId)
    }
    catch(err) {
        return res.status(500).json({
            err: "Greska pri komunikaciji sa serverom, pokusajte kasnije ili kontaktirajte administratora ukoliko se bude ponavljalo"
        })
    }

    if(!job) {
        return res.status(404).json({
            err: "Posao sa tim id-em ne postoji"
        })
    }

    try {
        user = await User.findById(userId)
    }
    catch(err) {
        return res.status(500).json({
            err: "Greska pri komunikaciji sa serverom, pokusajte kasnije ili kontaktirajte administratora ukoliko se bude ponavljalo"
        })
    }
 
    if(!user) {
        return res.status(404).json({
            err: "Korisnik sa tim id-em ne postoji"
        })
    }

    if(job.doneBy.toString() !== userId.toString()) {
        return res.status(403).json({
            err: "Korisnik ne moze da potvrdi gotovost posla jer posao nije dodeljen njemu"
        })
    }

    if(job.status !== "TAKEN")
        return res.status(400).json({
            err: "Posao koji nije u stanju rada ne moze da se zavrsi"
        })

    job.status = "STANDBY"
    await job.save()
    return res.status(200).json({
        job
    })
}

module.exports = {
    getJobs,
    addJob,
    updateJob,
    deleteJob,
    signWorker,
    setWorker,
    markJobDone,
    confirmJob
}