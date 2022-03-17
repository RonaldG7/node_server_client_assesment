const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema ({
    images: {
        type: [String],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bookings: [],
})

module.exports = mongoose.model("Posts", postSchema)