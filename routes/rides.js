const express = require('express');
const axios = require('axios');
const router = express.Router();
const Ride = require('../models/ride');
const User = require('../models/user');
const sendEmail = require('../middleware/MailHandler');


// Route to render the rides page
router.get('/', (req, res) => {
  res.render('rides'); // Assuming you have a rides.ejs file in your views directory
});

// Route to create a new ride
router.post('/create', async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.session.userId) {
      return res.status(401).render('error', { message: 'User not authenticated.' });
    }

    // Extract ride details from request body
    const { departure, destination, seatsAvailable, date, time, price } = req.body;
    console.log(req.body);
    // Validate input data
    if (!departure || !destination || !seatsAvailable || !date || !time || !price) {
      console.log(req.body);
      return res.status(400).render('error', { message: 'Missing required fields.' });
    }

    // Find the user who is the driver
    const driver = await User.findById(req.session.userId);
    // Create a new ride document
    const newRide = new Ride({
      driver: {
        _id: driver._id,
        username: driver.username
      },
      departure,
      destination,
      seatsAvailable,
      date,
      time,
      price,
      isActive: true
    });
    driver.postedRides.push(newRide._id);     // added 2
    // Save the new ride to the database
    await newRide.save();
    await driver.save();    // added 1
    console.log("done");
    // Redirect the user to the profile page after successful ride creation
    res.json({message :"Successfully inserted."});
    //res.redirect('/profile');
  } catch (error) {
    console.error('Error creating ride:', error);
    res.status(500).render('error', { message: 'An error occurred while creating the ride.' });
  }
});
  

// Route to handle autocomplete suggestions for departure and destination
router.get('/autocomplete/departure', async (req, res) => {
  const query = req.query.q;
  try {
    // Use OpenStreetMap Nominatim API for geocoding
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const results = response.data;
    res.json(results);
  } catch (error) {
    console.error('Error fetching autocomplete results:', error);
    res.status(500).json({ message: 'An error occurred while fetching autocomplete suggestions for departure.' });
  }
});

router.post('/filter', async (req, res) => {
  try {
    const { from, to, date } = req.body;
    console.log("Hello");
    // Query the "rides" collection for active rides that match the filter criteria
    const filteredRides = await Ride.find({
      departure: from,
      destination: to,
      date,
      isActive: true
    });
    //console.log(filteredRides);
    res.json(filteredRides);
  } catch (error) {
    console.error('Error filtering rides for carpools:', error);
    res.status(500).json({ message: 'An error occurred while filtering rides for carpools.' });
  }
});

router.post('/:rideId/book', async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.session.userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }
    
    // Get the ride ID from the request parameters
    const carpoolId = req.params.rideId;
    const { numSeats } = req.body;

    // Find the ride in the database
    const ride = await Ride.findById(carpoolId);
    if (req.session.userId == ride.driver._id)
    {
      return res.status(202).json({message:'cannot book own rides'})
    }

    const record = await User.find(ride.driver._id);
    let email = record[0].email;
    const html = `
    <h1>Ride Request</h1>
    <p>Someone has requested a ride, please check your profile</p>
    `

    // Check if the ride exists
    if (!ride) {
      console.log(3);
      return res.status(404).json({ message: 'Ride not found.' });
    }

    // Check if the ride is active
    if (ride.isActive == false) {
      console.log(4);
      return res.status(400).json({ message: 'Ride is not available for booking.' });
    }

    // Get the current user
    const user = await User.findById(req.session.userId);

    // Check if the user exists
    if (!user) {
      console.log(1);
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user has already booked this ride
    if (user.requestedRides.includes(ride._id)){
      console.log(2);
      return res.status(400).json({ message: 'You have already booked this ride.' });
    }

    // Update the ride and user models to reflect the booking
    ride.requests.push({ requestID: req.session.userId, seatsRequested: numSeats });
    user.requestedRides.push(ride._id);

    // Save the changes to the database
    await ride.save();
    await user.save();

    sendEmail(email,html);
    // Return success message
    res.status(200).json({ message: 'Ride booked successfully.' });
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json({ message: 'An error occurred while booking the ride.' });
  }
});

module.exports = router;
