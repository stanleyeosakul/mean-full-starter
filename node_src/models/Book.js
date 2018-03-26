let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String
});

module.exports = mongoose.model('Book', BookSchema);