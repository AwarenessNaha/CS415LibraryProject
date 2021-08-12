const express = require("express");
// const { deleteModel } = require("mongoose");
const bookRouter = express.Router();

// Load the Book model
const Book = require("../model/books");


// @access  Public
bookRouter.get("/list", (req, res) => {
    Book.find({})
        .sort({bookTitle: 1})
        .then(books => res.json(books))
});

bookRouter.post("/add", (req, res) => {
    const newBook = new Book({
        ISBN: req.body.ISBN,
        BookTitle: req.body.BookTitle,
        overdueFee: req.body.overdueFee,
        Publisher: req.body.Publisher,
        DatePublished: req.body.DatePublished
    });
    newBook.save().then(savedBook => res.json(savedBook));
});

bookRouter.get("/:id", (req, res) => {
    Book.findById(req.params.id)
        .then(bookFound => res.json(bookFound))
        .catch(err => res.status(404).json({errorCode: 404}))
});


bookRouter.delete("/delete/:id", (req, res) => {
    Book.findById(req.params.id)
        .then(bookFound => {
            console.log(`The Book object found is: ${bookFound}.`);
            bookFound.remove()
                        .then(() => res.json({ deleteSuccess: true }))
                        .catch(err => {
                            console.log(`Could not delete bookFound. \nError: ${err}`);
                            res.status(500).json({errorCode: 500});
                        });
            console.log(`The Book object: ${bookFound} was deleted successfully!`);
        })
        .catch(err => res.status(404).json({errorCode: 404}))
});




module.exports = bookRouter;