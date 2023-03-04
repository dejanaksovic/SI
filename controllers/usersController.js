const User = require("../models/user")
const mongoose = require('mongoose')

const getUsers = async (req, res) => {
    const { id } = req.params

    if (id) {
        try {
            const user = await User.findById(id)
            return res.status(200).json({
                user
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

    const {name, email, role = "USER"} = req.body
    
    //Creatign or returning inside error
    try {

    const user = await User.create({
        email,
        name,
        role: role.toUpperCase(),
    }) 

    return res.status(200).json({
        user,
    })
}

    catch(err) {
        return res.status(500).json({
            err,
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

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
}