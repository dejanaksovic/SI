const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Company has to have a name"]
    },

    contact: {
        tel: {
            type:String
        },
        email: {
            type:String
        }
    },

    jobs: [{type: mongoose.Types.ObjectId, ref: 'job'}],
}, {
    timestamps: true,
})

const Company = mongoose.model("companty", companySchema)

module.exports = Company