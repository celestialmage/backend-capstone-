const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// function that lists all theaters

async function list(req, res, next) {
  const { movieId } = req.params;

  const data = await service.list(movieId);

  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
