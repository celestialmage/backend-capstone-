if (process.env.USER) require("dotenv").config();

// server configuring

const express = require("express");
const app = express();
const cors = require("cors");

// importing routes

const theatersRouter = require("./theaters/theaters.router");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");

// importing error functions

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// incorporating cors
app.use(cors());
app.use(express.json());

// delegating routes

app.use("/theaters", theatersRouter);
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);

// delegating errors handlers

app.use(notFound);
app.use(errorHandler);

module.exports = app;
