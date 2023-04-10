const adminValidation = async (req, res, next) => {
    const {role} = req.user

    if(role!=="ADMIN")
        return res.status(403).json({
            err: "Nemate autorizaciju. za ovu uslugu potreban je admin"
        })

    next()
}

const bossValidation = async (req, res, next) => {
    const {role} = req.user

    console.log(role)

    if(role === "USER") 
        return res.status(403).json({
            err: "Nemate autorizaciju. Za ovu uslugu potreban vam je sef ili vise"
        })

    next()
}

module.exports = { 
    adminValidation,
    bossValidation
}