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
  it('should return the content of index.html', function (done) {
    // just assume that if it contains an <input> tag its index.html
    request
      .get('/api/transportation/')
      .expect(200, /<input/, done);
  });
});
