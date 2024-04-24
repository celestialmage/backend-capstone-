const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// function checks whether a review with the given id exists.

async function checkExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.find(reviewId);

  if (review[0]) {
    res.locals.id = reviewId;
    next();
  } else {
    next({ status: 404, message: "Review cannot be found." });
  }
}

// function that receives a single movie with the given ID and responds with it

async function read(req, res, next) {
  const { movieId } = req.params;
  const data = await service.read(movieId);
  res.json({ data: data });
}

// function that receives a single movie id and calls the service function which deletes it

async function destroy(req, res, next) {
  const id = res.locals.id;
  await service.delete(id);
  res.status(204).json({ data: {} });
}

// function that receives the body of the request and updates the given ID of the review and updates the matching review

async function update(req, res, next) {
  const updatedReview = req.body.data;
  const id = res.locals.id;
  const data = await service.update(updatedReview, id);
  const review = data[0];
  console.log(review);
  res.json({ data: review });
}

module.exports = {
  read: asyncErrorBoundary(read),
  delete: [asyncErrorBoundary(checkExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(checkExists), asyncErrorBoundary(update)],
};
