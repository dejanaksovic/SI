const adminValidation = async (req, res, next) => {
    const {role} = req.user

    if(role!=="ADMIN")
        return res.status(401).json({
            err: "This route requires admin permissions"
        })

    next()
}

const bossValidation = async (req, res, next) => {
    const {role} = req.user

    console.log(role)

    if(role === "USER") 
        return res.status(401).json({
            err: "This route requires boss permissions or higher"
        })

    next()
}

module.exports = { 
    adminValidation,
    bossValidation
}