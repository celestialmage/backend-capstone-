const knex = require("../db/connection");

const tableName = "reviews";

function find(id) {
  return knex(tableName).select().where({ review_id: id });
}

async function read(id) {
  const reviews = await knex("reviews").select().where({ movie_id: id });
  const critics = await knex("critics").select();

  reviews.map(
    (review) =>
      (review.critic = critics.find(
        (critic) => critic.critic_id === review.critic_id
      ))
  );

  return reviews;
}

async function destroy(id) {
  return knex("reviews").where({ review_id: id }).del();
}

async function update(updatedReview, id) {
  const content = updatedReview.content;
  const score = updatedReview.score;

  if (content) {
    await knex("reviews").update({ content: content }).where({ review_id: id });
  }
  if (score) {
    await knew("reviews").update({ score: score }).where({ review_id: id });
  }

  const review = await knex("reviews").select("*").where({ review_id: id });
  const critic = await knex("critics")
    .select("*")
    .where({ critic_id: review[0].critic_id });

  review[0].critic = critic[0];
  return review;
}

module.exports = {
  delete: destroy,
  find,
  read,
  update,
};
