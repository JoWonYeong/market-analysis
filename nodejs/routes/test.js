const router = require('express').Router()
const testModel = require('../models/testmodel')

router.get('/', (req, res) => {
    testModel.findAll().then(response => {
        res.send(response)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router