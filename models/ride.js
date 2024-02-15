const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true }
  },
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  requests: {type:
    [{
      requestID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      seatsRequested: { type: Number, required: true },
      status: { type: String, enum: ['accepted', 'rejected', 'pending'], default: 'pending' }
    }]
  },
  driverRating: { type: Number, default: 0 },
  riderRatings: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    rating: { type: Number, default: 0 }
  }]
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
