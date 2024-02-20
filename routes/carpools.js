// src/routes/carpools.js
const express = require('express');
const Ride = require('../models/ride');
const isAuthenticated = require('./auth');

const router = express.Router();

router.get('/rides', isAuthenticated, async (req, res) => {
  try {
    const { from, to, date } = req.query;
    console.log(from, to);
    // Create a query object
    const query = {
      departure: from,
      destination: to,
    };

    // If date is provided, add it to the query
    if (date) {
      query.date = new Date(date);
    }

    // Fetch rides based on the query
    const rides = await Ride.find(query).populate('driver');

    if (rides.length === 0) {
      // No rides found for the given criteria
      return res.render('carpools', { message: 'Sorry, no rides available' });
    }

    // Render rides if found
    return res.render('carpools', { rides, user: req.session.userId });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});



module.exports = router;
