const express = require('express')
const controller = require("./controller")


const router = express.Router()


router.get('/getAllData', controller.getAllItems)
router.get('/getItemsPerDay/:day/:month/:year', controller.getItemsPerDay)

module.exports = router