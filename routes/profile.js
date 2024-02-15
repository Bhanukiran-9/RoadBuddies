const express = require('express');
const User = require('../models/user');
const Ride = require('../models/ride');

const router = express.Router();

router.get('/', async (req, res) => {
  //console.log('In /');
  try {
    // Check if the user is authenticated
    if (!req.session.userId) {
      return res.redirect('/login'); // Redirect to login if user is not authenticated
    }

    // Fetch user details from the database
    const user = await User.findById(req.session.userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).render('error', { message: 'User not found.' });
    }

    // Fetch the user's posted ride requests
    const postedRideIds = user.postedRides;

    // Fetch details of the posted ride requests
    const postedRides = await Ride.find({ _id: { $in: postedRideIds }, isActive:true });

    // Initialize an array to store ride details with requester usernames
    const rideDetails = [];

    // Loop through the posted rides to fetch requester usernames
    for (const ride of postedRides) {
      // Fetch usernames of requesters and seats requested
      const requesterDetails = [];
      for (const request of ride.requests) {
        try {
          //console.log(request);
          const requester = await User.findById(request.requestID, { username: 1 });
          if (requester) {
            requesterDetails.push({ username: requester.username, seatsRequested: request.seatsRequested, _id: requester._id});
          } else {
            console.log(`User not found for requestID: ${request.requestID}`);
          }
        } catch (error) {
          console.error(`Error fetching requester details: ${error}`);
        }
      }
      rideDetails.push({ ride, requesterDetails });
    }

    // Render the profile page with ride details
    res.render('profile', { user, rideDetails });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).render('error', { message: 'An error occurred while fetching user details.' });
  }
});


router.post('/rideaccept', async (req, res) => {
  console.log('rideaccept');
  try {
    const rideId = req.body.rideId;
    const requestId = req.body.requestId;
    //console.log(requestId);
    const ride = await Ride.findById(rideId);
    //console.log(requestId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found.' });
    }

    // Find the index of the ride request in the ride's requests array
    const index = ride.requests.findIndex(request => request.requestID.equals(requestId));
    if (index === -1) {
      return res.status(404).json({ message: 'Ride request not found.' });
    }
    if (ride.seatsAvailable < ride.requests[index].seatsRequested)
    {
      return res.status(202).json({message: "Cannot accept, Required Seats are Unavailable"});
    }
    // Decrease available seats based on the number of seats requested
    ride.seatsAvailable -= ride.requests[index].seatsRequested;
    // If no seats available, mark ride as inactive
    if (ride.seatsAvailable === 0) {
      ride.isActive = false;
    }
    ride.requests[index].status = "accepted";
    // Remove the accepted request from the ride's requests array
    //ride.requests.splice(index, 1);

    await ride.save();
    // Send success message to frontend
    res.status(200).json({ message: 'Request accepted successfully.' });
  } catch (error) {
    console.error('Error accepting ride request:', error);
    res.status(500).json({ message: 'An error occurred while accepting ride request.' });
  }
});

router.post('/ridereject', async (req, res) => {
  try {
    console.log(req.body);
    const rideId = req.body.rideId;
    //console.log(rideId);
    const requestId = req.body.requestId;
    console.log(requestId);
    const ride = await Ride.findById(rideId);
    
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found.' });
    }

    const index = ride.requests.findIndex(request => request.requestID.equals(requestId));
    if (index === -1) {
      return res.status(404).json({ message: 'Ride request not found.' });
    }

    // Remove the rejected request from the ride's requests array
    ride.requests[index].status = "rejected";
    ride.isActive = false;

    await ride.save();
    // Send success message to frontend
    res.status(200).json({ message: 'Request rejected successfully.' });
  } catch (error) {
    console.error('Error rejecting ride request:', error);
    res.status(500).json({ message: 'An error occurred while rejecting ride request.' });
  }
});


module.exports = router;
