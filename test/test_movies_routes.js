var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var should = chai.should();
var server = require('../app');
chai.use(chaiHttp);

describe('Movies CRUD Routes', function() {
  it('should GET /movies', function (done) {
    chai.request(server).get('/movies')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should GET /movies/new', function (done) {
    chai.request(server).get('/movies/new')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should POST to /movies', function (done) {
    chai.request(server).post('/movies')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should GET /movies/:id', function (done) {
    chai.request(server).get('/movies/2')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should GET /movies/2/edit', function (done) {
    chai.request(server).get('/movies/2/edit')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should POST /movies/:id', function (done) {
    chai.request(server).post('/movies/2')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it('should POST /movies/:id/delete', function (done) {
    chai.request(server).post('/movies/2/delete')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});
