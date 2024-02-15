const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const axios = require('axios');

const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Define a route to handle GET requests to the "/carpools" path
router.get('/carpools', (req, res) => {
  // Render the carpools view
  res.render('carpools');
});


// Login Route
router.post('/login', async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    // Find user by phone number
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.render('login', { error: 'User not found. Please check your phone number.' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render('login', { error: 'Incorrect password. Please try again.' });
    }

    // Store user ID in session
    req.session.userId = user._id;

    res.render('home');
  } catch (error) {
    console.log('error check');
    console.error(error);
    res.render('login', { error: 'An error occurred. Please try again.' });
  }
});


// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

async function generateAvatarUrl(username) {
  try {
      const response = await axios.get(`https://robohash.org/${username}?set=set4`);
      return response.data;
  } catch (error) {
      console.error('Error generating avatar URL:', error);
      return null;
  }
}
// Register Route
const saltRounds = 10; // Number of salt rounds for bcrypt

// Register Route
router.post('/register', async (req, res) => {
  try {
    // Extract user details from the request body
    const { username, password, phoneNumber, email } = req.body;

    // Check if a user with the same phone number already exists
    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      // If a user with the same phone number already exists, return an error
      return res.status(400).json({ message: 'Phone number is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    

    // Construct the URL for the random avatar
    const avatarUrl = `https://robohash.org/${username}.png`;
    ;



    // Create a new user object with the hashed password
    const newUser = new User({
      username,
      password: hashedPassword,
      phoneNumber,
      email,
      profileImage: avatarUrl,
    });

    // Save the new user to the database
    await newUser.save();

    // Render the successful register page
    res.render("successfulRegister");
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'An error occurred while registering user' });
  }
});



// Logout Route
router.get('/logout', (req, res) => {
  // Destroy the session and clear the session cookie upon logout
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
