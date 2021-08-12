const mongoose = require("mongoose");

// Define the Book Schema
const BookSchema = new mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    "BookTitle": {
        type: String,
        required: true
    },
    "overdueFee": {
        type: Number,
        required: false,
        default: 0.00
    },
    Publisher: {
        type: String,
        required: false
    },
    "DatePublished": {
        type: Date,
        required: false,
        default: Date.now
    }
});

// Create and export the Book model
const Book = mongoose.model("book", BookSchema);
module.exports = Book;