const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["PPO", "SA", "EP"],
        required: [true, "Job needs a type"]
    },

    price: {
        type: Number,
    },

    status: {
        type: String,
        enum: ["TAKEN", "AVAILABLE", "STANDBY", "DONE"],
        default: ["AVAILABLE"]
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