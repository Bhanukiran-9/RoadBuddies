// app.js

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const isAuthenticated = require('./middleware/auth');
const ridesRouter = require('./routes/rides');
const profileRouter = require('./routes/profile');
const historyRouter = require('./routes/history');
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up session middleware
app.use(session({
  secret: process.env.SECRETKEY,
  resave: false,
  saveUninitialized: true,
}));


// Set up routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const carpoolsRoutes = require('./routes/carpools');
const loginRoutes = require('./routes/auth');
const homeroutes = require('./routes/home');

console.log('In app');
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use(isAuthenticated);
app.use('/carpools', carpoolsRoutes);
app.use('/rides', ridesRouter);
app.use('/login', loginRoutes);
app.use('/history', historyRouter);
app.use('/profile', profileRouter); // Mount the profile router
app.use('/home', homeroutes);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/logout', (req, res) => {
  // Destroy session data
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
      } else {
          res.send('Logged out successfully');
      }
  });
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://ProjectRoad:NPTztgxA53lHdIIt@cluster0.cw81lph.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

//app.listen(port, () => {console.log("error")})
module.exports = app;