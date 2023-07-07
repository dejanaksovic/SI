const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["protivpozarna obuka", "servisiranje aparata", "posebna obuka"],
        required: [true, "Job needs a type"]
    },

    price: {
        type: Number,
    },

    status: {
        type: String,
        enum: ["DOSTUPAN", "ZAUZET", "NA_CEKANJU", "ODRADJEN"],
        default: "AVAILABLE",
    },

    isRenewable: {
        type: Boolean,
        default: true,
    },

    wantedBy: [
        {
            type: mongoose.Types.ObjectId,
            default: null,
            ref: 'User'
        }
    ],

    doneBy: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref: 'User'
    },

    doneDate: {
        type: Date,
        default: null,
    },

    company: {
        type: mongoose.Types.ObjectId,
        ref: 'Company'
    }
}, 
{
  timestamps: true  
})

const Job = mongoose.model("job", JobSchema)

module.exports = Job