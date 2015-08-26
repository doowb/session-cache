'use strict';

var assert = require('assert');
var cache = require('./');

describe('session-cache', function () {
  it('should create a new session cache', function () {
    var session = cache('my test session');
    assert.equal(session.name, 'my test session');
  });
});
