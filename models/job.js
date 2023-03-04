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
        enum: ["TAKEN", "AVAILABLE", "STANDBY"],
        default: ["AVAILABLE"]
    }
}, 
{
  timestamps: true  
})

const Job = mongoose.model("job", JobSchema)

module.exports = Job