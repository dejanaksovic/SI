const User = require("../models/user")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Job = require('../models/job')

const getUsers = async (req, res) => {
    const { id } = req.params

    if (id) {
        try {
            const user = await User.findById(id)
            const jobs = await Job.find({
                doneBy: user._id
            })

            return res.status(200).json({
                user,
                jobs
            })
        }

        catch(err) {
            res.status(400).json({
                err
            })
        }
    }

    try {
        const users = await User.find()
        return res.status(200).json({
            users
        })
    }

    catch(err) {
        return res.status(400).json({
            err
        })
    }
}

const createUser = async (req, res) => {

    const {name, email, role = "USER", password} = req.body

    let hash = ""    
    try {
    //Creatign or returning inside error
    const salt = await bcrypt.genSalt(12)
    console.log(password, salt)
    hash = await bcrypt.hash(password, salt)
    }

    catch(err) {
        console.log(err)
        return res.status(500).json({
            err: err.message
        })
    }
    
    try{
    const user = await User.create({
        email,
        name,
        password: hash,
        role: role.toUpperCase(),
    })

    return res.status(200).json({
        user,
        token: jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '1h'})
    })}

    catch(err) {
        console.log(err)
        return res.status(400).json({
            err
        })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
    const user = await User.findByIdAndRemove(id)
    return res.status(200).json({
        user,
    })}

    catch(err) {
        return res.status(500).json({
            err
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const {name, email, role} = req.body

    console.log(id, email, role, name)

    try {
        const user = await User.findByIdAndUpdate(id, {
            name,
            email,
            role
        }, {
            new: true,
        })

        return res.status(200).json({
            user
        })
    }

    catch(err) {
        return res.status(500).json({
            err
        })
    }

}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)    

        try {
        const user = await User.findOne({email})
        
        if(!user) {
            return res.status(404).json({
                err: "The user with that email doesn't exist"
            })
        }
        
        if(!await bcrypt.compare(password, user.password)) {
            throw Error("Inalid credentials")
        }

        return res.status(200).json({
            user,
            token: jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '24h'})
        })
    }
        catch(err) {
            return res.status(400).json({
                err: err.message
            })
        }

}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    loginUser
}