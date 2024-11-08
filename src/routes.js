const express = require('express')
const controller = require("./controller")


const router = express.Router()


router.get('/getAllData', controller.getAllItems)

module.exports = router