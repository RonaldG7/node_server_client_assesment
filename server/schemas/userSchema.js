const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    admin: {
      type: Boolean,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    bookings: {
        type: Array
    },
})

module.exports = mongoose.model("Users", userSchema)