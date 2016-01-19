var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var should = chai.should();
var server = require('../app');
chai.use(chaiHttp);

describe('Reviews CRUD Routes', function() {
  it('should GET /movies/:movie_id/reviews', function (done) {
    chai.request(server).get('/movies/1/reviews')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should GET /movies/:movie_id/reviews/new', function (done) {
    chai.request(server).get('/movies/2/reviews/new')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should POST /movies/:movie_id/reviews', function (done) {
    chai.request(server).post('/movies/3/reviews')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should GET /movies/:movie_id/reviews/:id', function (done) {
    chai.request(server).get('/movies/2/reviews/1')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should GET /movies/:movie_id/reviews/:id/edit', function (done) {
    chai.request(server).get('/movies/2/reviews/1/edit')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should POST to /movies/:movie_id/reviews/:id', function (done) {
    chai.request(server).post('/movies/2/reviews/2')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should POST to /movies/:movie_id/reviews/:id/delete', function (done) {
    chai.request(server).post('/movies/2/reviews/1/delete')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});
