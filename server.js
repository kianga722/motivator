"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
// Quote Model
const Quote_1 = require("./models/Quote");
const Video_1 = require("./models/Video");
// DOTENV
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// Express
const app = (0, express_1.default)();
// DB Config
const db = process.env.mongoURI;
// Connect to Mongo
if (db) {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default
        .connect(db)
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err));
}
// Endpoint for random quote
app.get('/api/quote', (req, res) => {
    Quote_1.Quote
        .countDocuments()
        .exec((err, countDocuments) => {
        const random = Math.floor(Math.random() * countDocuments);
        Quote_1.Quote
            .findOne()
            .skip(random)
            .then(quoteRand => res.json(quoteRand));
    });
});
// Endpoint for random video
app.get('/api/video', (req, res) => {
    Video_1.Video
        .countDocuments()
        .exec((err, countDocuments) => {
        const random = Math.floor(Math.random() * countDocuments);
        Video_1.Video
            .findOne()
            .skip(random)
            .then(videoRand => res.json(videoRand));
    });
});
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express_1.default.static(path_1.default.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, 'client/build', 'index.html'));
    });
}
// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
