const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email :{type: String, required:true,unique:true},
  requestedRides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
  postedRides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
  canceledRides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
  profileImage: { type: String },
  rating: { type: Number, default: 0 } // Add rating field with a default value of 0
});

const User = mongoose.model('User', userSchema);

module.exports = User;
  