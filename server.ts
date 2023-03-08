import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

// Quote Model
import { Quote } from './models/Quote';
import { Video } from './models/Video';

// DOTENV
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Express
const app = express();

// DB Config
const db = process.env.mongoURI;
// Connect to Mongo
if (db) {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
}

// Endpoint for random quote
app.get('/api/quote', (req, res) => {
  Quote
    .countDocuments()
    .exec((err, countDocuments) => {
      const random = Math.floor(Math.random() * countDocuments);
      Quote
        .findOne()
        .skip(random)
        .then(quoteRand => res.json(quoteRand));
    });
});

// Endpoint for random video
app.get('/api/video', (req, res) => {
  Video
    .countDocuments()
    .exec((err, countDocuments) => {
      const random = Math.floor(Math.random() * countDocuments);
      Video
        .findOne()
        .skip(random)
        .then(videoRand => res.json(videoRand));
    });
});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
