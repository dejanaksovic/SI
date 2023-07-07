const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Company has to have a name"]
    },

    tel: {
        type:String
    },
    
    email: {
        type:String,
        unique: true,
    },

    adress: {
        type: String,
    }

}, {
    timestamps: true,
})

const Company = mongoose.model("companty", companySchema)

module.exports = Company