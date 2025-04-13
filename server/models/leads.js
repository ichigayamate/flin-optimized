const mongoose = require('mongoose');

// Define the schema for the leads model
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  loanType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;