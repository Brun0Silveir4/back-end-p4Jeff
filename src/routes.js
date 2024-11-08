const express = require('express')
const endpoints = require('./api/endpoints')


const router = express.Router()


router.get('/getAllData', endpoints.getAllItems)
router.get('/getItemsPerDay/:day/:month/:year', endpoints.getItemsPerDay)

module.exports = router