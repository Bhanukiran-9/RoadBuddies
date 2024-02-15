const express = require('express');
const router = express.Router();

router.get('/book', (req, res) => {
    
    res.render('carpools');
});

router.get('/post', (req, res) => {
    res.render('rides');
});

router.get('/', (req, res) => {
    res.render('home');});

module.exports = router;