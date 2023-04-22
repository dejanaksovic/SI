const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenValidation = async (req, res, next) => {

    const header = req.headers['authorization']
    let userId;

    if(!header) {
        return res.status(401).json({
            err: "No authorization"
        })
    }

    const token = header.split(' ')[1] 

    if(!token) 
        return res.status(401).json({
            err: "Neautorizovan pristup"
        })
    
    try {
        const {id} = jwt.verify(token, process.env.SECRET)
        userId = id
    }

    catch(err) {
        return res.status(401).json({
            err: "Greska pri verifikovanju, uluguj te se ponovo"
        })
    }

    try {
        const user = await User.findById(userId)

        if(!user)
            return res.status(401).json({
                err: "Korisnik sa tim id-em ne postoji. Ulogujte se ponovo"
            })

        req.user = user
    }

    catch(err) {
        return res.status(500).json({
            err
        })
    }

    next()
}

module.exports = tokenValidation