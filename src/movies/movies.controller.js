const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// middleware functions

// function checks whether a movie with the given ID exists

async function checkExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie[0]) {
    res.locals.movie = movie[0];
    next();
  } else {
    next({
      status: 404,
      message: `Movie with ID of '${movieId}' could not be found.`,
    });
  }
}

// end of middleware functions

// controller functions

// function that lists out the full list of movies

async function list(req, res, next) {
  const showing = req.query.is_showing;

  const data = await service.list(showing);
  res.json({ data: data });
}

// function that returns a single movie from a given ID

function read(req, res, next) {
  const movie = res.locals.movie;
  res.json({ data: movie });
}

//end of controller functions

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(checkExists), asyncErrorBoundary(read)],
};
