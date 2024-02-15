const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Ride = require('../models/ride');

// Route to fetch user's history
router.get('/', async (req, res) => {
    try {
        // Retrieve the user ID from the session or wherever it's stored
        const userId = req.session.userId; // Assuming userId is stored in session

        // Fetch the user based on the user ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch the requested rides using the IDs stored in the user's requestedRides array
        const requestedRides = await Ride.find({ _id: { $in: user.requestedRides } });

        // Fetch the posted rides using the IDs stored in the user's postedRides array
        const postedRides = await Ride.find({ _id: { $in: user.postedRides } });

        res.render('./history',{ requestedRides, postedRides });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
