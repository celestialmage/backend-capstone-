const knex = require("../db/connection");

const tableName = "theaters";

async function list(id = null) {
  if (!id) {
    const theaters = await knex(tableName).select();
    const movies = await knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*", "mt.is_showing", "mt.theater_id");
    theaters.map(
      (theater) =>
        (theater.movies = movies.filter(
          (movie) => movie.theater_id === theater.theater_id
        ))
    );

    return theaters;
  } else {
    return knex("theaters as t")
      .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
      .select("t.*", "mt.is_showing", "mt.movie_id")
      .where({ "mt.is_showing": true })
      .andWhere({ "mt.movie_id": id });
  }
}

module.exports = {
  list,
};
