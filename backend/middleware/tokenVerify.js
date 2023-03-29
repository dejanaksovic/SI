const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenValidation = async (req, res, next) => {

    const header = req.headers['authorization']

    if(!header) {
        return res.status(401).json({
            err: "No authorization"
        })
    }

    const token = header.split(' ')[1] 

    if(!token) 
        return res.status(401).json({
            err: "Unothorized acces"
        })
    
    try {
        const {id} = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(id)
        req.user = user
    }

    catch(err) {
        return res.status(401).json({
            err
        })
    }

    next()
}

module.exports = tokenValidation