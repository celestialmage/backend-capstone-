const knex = require("../db/connection");

const tableName = "movies";

function list(showing = false) {
  if (!showing) {
    return knex("movies").select().orderBy("movie_id");
  } else {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .distinct("m.*")
      .where({ "mt.is_showing": true })
      .orderBy("movie_id");
  }
}

function read(id) {
  return knex(tableName).select().where({ movie_id: id });
}

module.exports = {
  list,
  read,
};
