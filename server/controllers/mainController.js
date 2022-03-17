const userSchema = require('../schemas/userSchema')
const postSchema = require('../schemas/postSchema')
const bcrypt = require("bcrypt")
const moment = require('moment')

module.exports = {
    loggedIn: async (req, res) => {
        const {checked} = req.session
        try {
            if (checked) return res.send({success: true})
            res.send({success: false})
        } catch (err) {
            console.log(err)
        }
    },
    register: async (req, res) => {
        const {username, email, admin, password} = req.body
        try {
            const hash = await bcrypt.hash(password, 10)
            const user = await new userSchema({
                username,
                email,
                admin,
                password: hash
            })
            await user.save()

            res.send({success: true})
        } catch (err) {
            console.log(err)
        }
    },
    login: async (req, res) => {
        const {username, password, checked} = req.body
        try {
            const findUser = await userSchema.findOne({username})
            if (findUser) {
                const compareResult = await bcrypt.compare(password, findUser.password)
                if (compareResult) {
                    req.session.username = username
                    req.session.checked = checked
                    if (findUser.admin) return res.send({success: true, admin: true})
                    return res.send({success: true})
                }
            }
            res.send({success: false, message: 'Bad credentials'})
        } catch (err) {
            console.log(err)
        }
    },
    getPosts: async (req, res) => {
        const {username} = req.session
        try {
            if (username) {
                const posts = await postSchema.find({})
                return res.send({success: true, posts})
            }
            res.send({success: false})
        } catch (err) {
            console.log(err)
        }
    },
    uploadPost: async (req, res) => {
        const {images, name, description, city, price} = req.body
        const {username} = req.session
        try {
            if (username) {
                const post = new postSchema({
                    images,
                    name,
                    description,
                    city,
                    price: Number(price)
                })
                await post.save()
                return res.send({success: true})
            }
            res.send({success: false, message: "Not logged in"})
        } catch (err) {
            console.log(err)
        }
    },
    getPostCard: async (req, res) => {
        const {username} = req.session
        const {_id} = req.params
        try {
            if (username) {
                const post = await postSchema.findOne({_id})
                return res.send({success: true, post})
            }
            res.send({success: false, message: "Not logged in"})
        } catch (err) {
            console.log(err)
        }
    },
    getBookings: async (req, res) => {
        const {username} = req.session
        try {
            if (username) {
                const user = await userSchema.findOne({username})
                return res.send({success: true, bookings: user.bookings})
            }
            res.send({success: false, message: "Not logged in"})
        } catch (err) {
            console.log(err)
        }
    },
    search: async (req, res) => {
        const {city, priceFrom, priceTo, date} = req.body
        const {username} = req.session
        try {
            if (username) {
                const posts = await postSchema.find({})

                const filtered = posts.filter(x => city !== "" ? x.city.toLowerCase() === city.toLowerCase() : x)
                const filtered2 = filtered.filter(x => priceFrom !== "" ? x.price >= priceFrom : x)
                const filtered3 = filtered2.filter(x => priceTo !== "" ? x.price <= priceTo : x)

                let filtered4 = null
                if (date !== null) {
                    const startDate = moment(date[0])
                    const endDate = moment(date[1])
                    const now = startDate
                    while (now.isBefore(endDate) || now.isSame(endDate)) {
                        filtered4 = filtered3.filter(x => !x.bookings.includes(now.format('YYYY-MM-DD')))
                        now.add(1, 'days')
                    }
                    return res.send({success: true, posts: filtered4})
                } else {
                    return res.send({success: true, posts: filtered3})
                }
            }
            res.send({success: false, message: "Not logged in"})
        } catch (err) {
            console.log(err)
        }
    },
    hotelBooking: async (req, res) => {
        const {postId, date} = req.body
        const {username} = req.session
        try {
            if (username) {

                const startDate = moment(date[0])
                const endDate = moment(date[1])
                const now = startDate
                while (now.isBefore(endDate) || now.isSame(endDate)) {
                    await postSchema.findOneAndUpdate({_id: postId}, {$push: {bookings: (now.format('YYYY-MM-DD'))}})
                    now.add(1, 'days')
                }
                const post = await postSchema.findOne({_id: postId})
                await userSchema.findOneAndUpdate({username}, {$push: {bookings: {...post}}})

                return res.send({success: true, post})
            }
            res.send({success: false, message: "Not logged in"})
        } catch (err) {
            console.log(err)
        }
    },
    logout: async (req, res) => {
        try {
            req.session.unername = null
            req.session.checked = null
            res.send({success: true})
        } catch (err) {
            console.log(err)
        }
    }
}