var chai = require('chai');
var assert = require('assert');
var should = chai.should();
var knex = require('../db/knex');
var chaiHttp = require('chai-http');
var server = require('../app');
chai.use(chaiHttp);

function Movies() {
  return knex('movies');
}

var theMovie = {
  director: 'Jeff Dean',
  title: 'What Would Jeff Dean Do?',
}

describe('Movies CRUD Routes', function() {
  beforeEach(function () {
    return knex.seed.run(knex.config);
  });

  it('should use knex migrations', function () {
    return knex('knex_migrations').select().then(function (migrations) {
      moviesMigration = migrations[1].name.split('_');
      assert.equal(moviesMigration[1], 'create');
      assert.equal(moviesMigration[2], 'movies.js');
      reviewsMigration = migrations[0].name.split('_');
      assert.equal(reviewsMigration[1], 'create');
      assert.equal(reviewsMigration[2], 'reviews.js');
    })
  })
  it('should get all movies from the Movies db', function () {
    return Movies().select().then(function (movies) {
      movies.should.have.length(3);
    });
  });
  it('should create a movie', function () {
    return Movies().insert(theMovie).then(function (results) {
      return Movies().select().then(function (movies) {
        movies.should.have.length(4);
      })
    })
  });
  it('should find a movie', function () {
    return Movies().where('title', 'Adventures in CRUD').first().then(function (movie) {
      assert.equal(movie.title, 'Adventures in CRUD');
      assert.equal(movie.director, 'Martha Berner');
      movie.should.have.property('id');
    })
  });
  it('should update a movie', function () {
    return Movies().where('title', 'Spiral Like A Boss').update({
          director: 'The Nmuta Jones',
          title: 'Spiraling Like A Boss'
        }).then(function (result) {
          return Movies().where('title', 'Spiraling Like A Boss')
          .then(function (movie) {
          return Movies().select()
          .then(function (movies) {
            assert.equal(movie[0].title, 'Spiraling Like A Boss');
            assert.equal(movie[0].director, 'The Nmuta Jones');
            movies.should.have.length(3);
        });
      })
    });
  });
  it('should delete a movie', function () {
    return Movies().where('title', 'The Great Beyond').first().del().then(function (results) {
      return Movies().select().then(function (movies) {
        movies.should.have.length(2);
      })
    })
  });

});
