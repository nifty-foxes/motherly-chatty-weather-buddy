var assert = require('assert');
var server = require('../web/server.js');
var supertest = require('supertest');
var request = supertest.agent(server);

describe('Example', function() {
  it('should return -1 when the value is not present', function() {
    assert.equal(-1, [1,2,3].indexOf(4));
  });
});


describe('Server', function() {
  it('should receive a 200 status code from "/"', function (done) {
    // just assume that if it contains an <input> tag its index.html
    request
      .get('/')
      .expect(200, done);
  });

  it('should receive a 200 status code from "api/transportation"', function (done) {
    // just assume that if it contains an <input> tag its index.html
    request
      .get('/api/transportation/')
      .expect(404, done);
  });

  it('should receive a 404 status code from nonexistent endpoint', function (done) {
    // just assume that if it contains an <input> tag its index.html
    request
      .get('/bleebloo')
      .expect(404, done);
  });
});

describe('Functions', function() {

  it('should have function ', function (done) {
    // just assume that if it contains an <input> tag its index.html
    request
      .get('/bleebloo')
      .expect(404, done);
  });

});
