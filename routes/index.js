// src/routes/index.js
const express = require('express');
const isAuthenticated = require('./auth');

const router = express.Router();

router.get('/', isAuthenticated, (req, res) => {
  res.render('index', { user: req.session.userId });
});

module.exports = router;
