const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send("SORRY NOT AN ADMIN!")
})

router.get('/topsecret', (req, res) => {
    res.send('This is top secret')
})

router.get('/deleteall', (req, res) => {
    res.send('Ok deleted everything')
})

module.exports = router;