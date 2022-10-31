const router = require('express').Router()
const summaryModel = require('../models/summarymodel')

router.get('/', (req, res) => {
    summaryModel.findAll().then(response => {
        res.send(response)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router