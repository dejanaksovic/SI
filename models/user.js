const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is require']
    },

    email: {
        type: String,
        require: [true, "Email must be defined"],
        unique: [true, "Email must be unique"]
    },

    role: {
        type: String,
        enum: ["ADMIN", "BOSS", "USER"],
        required: [true, "The user needs to have a role"],
        default: "USER"
    }

    //add in geolocation
})

const User = mongoose.model("user", userSchema)

module.exports = User