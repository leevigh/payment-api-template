const express = require('express')
const router = express.Router()
const { payment, verify } = require('../controllers/index')

router.get('/', (req, res) => {
    res.send("Home route!")
})

router.post('/pay/:id', payment)

router.get('/verify/:id', verify)

module.exports = router;
