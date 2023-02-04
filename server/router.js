const express = require('express')

const router = express.Router()

const usersRoutes = require('./user-controllers.js')

router.put('/check', usersRoutes.usersCheck)

router.post('/create', usersRoutes.usersCreate)

module.exports = router