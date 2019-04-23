const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const QuoteSchema = new Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = Quote = mongoose.model('quote', QuoteSchema);
