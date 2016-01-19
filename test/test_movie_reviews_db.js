var chai = require('chai');
var assert = require('assert');
var should = chai.should();
var config = require('../knexfile')['test'];
var knex = require('../db/knex');
var Promise = require("bluebird");

function Movies() {
  return knex('movies');
}

function Reviews() {
  return knex('reviews');
}

describe('Movie Reviews Database CRUD', function() {
  beforeEach(function () {
    return knex.seed.run(knex.config);
  });

  it('should get all movie reviews for a given movie', function () {
    return Movies().where('title', 'The Great Beyond').first().then(function (movie) {
      return Reviews().where('movie_id', movie.id).then(function (reviews) {
        reviews.should.have.length(2)
      })
    });
  });
  it('should create a movie review', function () {
    return Movies().where('title', 'Spiral Like A Boss').first().then(function (movie) {
      return Promise.all([
        Reviews().insert({
            movie_id: movie.id,
            author: 'Moldy Mike',
            rating: 5
          }),
        Reviews().insert({
            movie_id: movie.id,
            author: 'Aanal Patel',
            rating: 6
          }),
      ]).then(function (results) {
        return Reviews().where('movie_id', movie.id).then(function (reviews) {
          reviews.should.have.length(2)
        })
      })
    })
  });
  it('should find a movie review', function () {
    return Movies().where('title', 'Adventures in CRUD').first().then(function (movie) {
      return Reviews().where('movie_id', movie.id).then(function (reviews) {
        reviews.should.have.length(1);
        assert.equal(reviews[0].author, 'Smarmy Stu');
        assert.equal(reviews[0].rating, 9);
      })
    })
  });
  it('should update a movie review', function () {
    var review_id;
    return Reviews().select().then(function (reviews) {
      review_id = reviews[0].id;
      return Reviews().where('id', review_id).first().update({
        author: 'Not whoever it was',
        rating: 0
      }).then(function (result) {
        return Reviews().where('id', review_id).first().then(function (review) {
          assert.equal(review.author, 'Not whoever it was');
        })
      })
    })
  });
  it('should delete a movie review', function () {
    return Reviews().select().then(function (reviews) {
      numReviews = reviews.length;
      review_id = reviews[1].id;
      return Reviews().where('id', review_id).del().then(function (results) {
        return Reviews().select().then(function (results) {
          assert.equal(results.length, numReviews-1)
        })
      })
    })
  });
});
