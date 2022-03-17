const express = require('express')
const router = express.Router()
const {loggedIn, register, login, getPosts, uploadPost, getBookings, getPostCard, search, hotelBooking, logout} = require('../controllers/mainController')
const {regValidator, loginValidator, uploadPostValidator, hotelBookingValidator} =require('../middleware/validator')

router.get('/loggedIn', loggedIn)
router.post('/register', regValidator, register)
router.post('/login', loginValidator, login)
router.get('/getPosts', getPosts)
router.post('/uploadPost', uploadPostValidator, uploadPost)
router.get('/getBookings', getBookings)
router.get('/getPostCard/:_id', getPostCard)
router.post('/search', search)
router.post('/hotelBooking', hotelBookingValidator, hotelBooking)
router.get('/logout', logout)

module.exports = router