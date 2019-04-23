const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// Quote Model
const Quote = require('./models/Quote');

// DOTENV
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Express
const app = express();

// DB Config
const db = process.env.mongoURI;
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Endpoint for random quote
app.get('/api/', (req, res) => {
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


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
