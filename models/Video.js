const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const VideoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = Video = mongoose.model('video', VideoSchema);
