const Company = require('../models/company')
const Job = require('../models/job')

const getCompanies = async (req, res) =>{ 
    const { id } = req.params

    if(id) {
        try {
            const company = await Company.findByid(id)
            return res.status(200).json({
                company
            })
        }

        catch(err) {
            return res.status(400).json({
                err
            })
        }
    }

    try{
        const companies = await Company.find()
        return res.status(200).json({
            companies
        })
    }

    catch(err) {
        return res.status(400).json({
            err
        })
    }
    
}

const addCompany = async (req, res) => {
    const { name, tel, email, adress } = req.body
    
    console.log(name, tel, email, adress);

    try {
        const company = await Company.create({
            name,
            tel,
            email,
            adress,
        })

        return res.status(200).json({
            company
        })
    }

    catch(err) {
        console.log(err);

        return res.status(400).json({
            err
        })
    }
}

const deleteCompany = async (req, res) => {
    const { id } = req.params

    try {

        const company = await Company.findByIdAndDelete(id)

        console.log(company);

        await Job.deleteMany({
            company: id
        })

         return res.status(200).json({
           company
        })
    }

    catch(err) {
        return res.status(400).json({
            err
        })
    }

}

const updateCompany = async (req, res) => {
    const { id } = req.params
    const { name, tel, email } = req.body

    try {
        const company = await Company.findByIdAndUpdate(id, {
            name,
            contact: {
                tel,
                email
            }
        }, {
            new: true,
        })

        return res.status(200).json({
            company,
        })
    }

    catch(err) {
        return res.status(400).json({
            err,
        })
    }
}

module.exports = {
    getCompanies,
    addCompany,
    deleteCompany,
    updateCompany
}