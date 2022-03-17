const emailValidator = require("email-validator")
const userSchema = require('../schemas/userSchema')
const postSchema = require('../schemas/postSchema')
const moment = require('moment')

module.exports = {
    regValidator: async (req, res, next) => {
        const {username, email, password, passwordTwo} = req.body

        const findUsername = await userSchema.findOne({username})
        const findEmail = await userSchema.findOne({email})

        if (findUsername) return res.send({success: false, message: 'Username in use'})
        if (findEmail) return res.send({success: false, message: 'Email in use'})

        if (!emailValidator.validate(email)) return res.send({success: false, message: 'Check email please'})
        if (4 > username.length) return res.send({success: false, message: 'Username too short'})
        if (username.length > 20) return res.send({success: false, message: 'Username too long'})
        if (4 > password.length) return res.send({success: false, message: 'Password too short'})
        if (password !== passwordTwo) return res.send({success: false, message: 'Passwords don`t match'})

        next()
    },
    loginValidator: async (req, res, next) => {
        const {username, password} = req.body

        if (username.length === 0) return res.send({success: false, message: 'Enter username'})
        if (password.length === 0) return res.send({success: false, message: 'Enter password'})

        next()
    },
    uploadPostValidator: async (req, res, next) => {
        const {images, name, description, city, price} = req.body

        const imageCheck = images.map(x => x.startsWith('http'))
        if (images.length === 0) return res.send({success: false, message: "Add image"})
        if (!imageCheck) return res.send({success: false, message: "URL has to start with HTTP"})
        if (name.length === 0 ) return res.send({success: false, message: "Enter name"})
        if (description.length === 0 ) return res.send({success: false, message: "Enter description"})
        if (city.length === 0 ) return res.send({success: false, message: "Enter city"})
        if (price.length === 0 ) return res.send({success: false, message: "Enter price"})

        next()
    },
    hotelBookingValidator: async (req, res, next) => {
        const {postId, date} = req.body

        const post = await postSchema.findOne({postId})
        if (date === null) return res.send({success: false, message: "No dates selected"})
        if (post.bookings.includes(moment(date[0]).format("YYYY-MM-DD"))) return res.send({success: false, message: "Date is booked"})
        if (post.bookings.includes(moment(date[1]).format("YYYY-MM-DD"))) return res.send({success: false, message: "Date is booked"})
        next()
    }
}