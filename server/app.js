/**
 * app.js
 * CS415 project Fairfield City Library
 * @author Naha The Unborn One
 * @since 2021-08-05
 * 
 */

 const express = require('express');
 const mongoose = require("mongoose");
 const cors = require('cors');

 const bookRouter = require("./routes/routes");

 const app = express();

 // setup the express json parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

 // Load DB config
const dbConnectionURI = require("./dbConfig/dbConnection").mongodbURI;

// Connect to the MongoDB database
mongoose
    .connect(dbConnectionURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log("Successfully connected to db on MongoDB localhost"))
    .catch(err => console.log(err));

// Routes
app.use("/citylibrary/api/book", bookRouter);

app.listen(4000, () => console.log('server started. listening to 4000...'));
