const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    default : 6
  },
  isFree: {
    type: Boolean,
    required: true,
    default: true,
  },
  startDate: {
    type: Date,
  },
  otp : {
    type: Number,
  }
}, { timestamps: true });

const floorSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  slots: {
    type: [slotSchema],
    required: true,
  },
});

const parkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  floors: {
    type: [floorSchema],
    required: true,
  },
  rate : {
    type : Number,
    required : true,
  }
});

const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;