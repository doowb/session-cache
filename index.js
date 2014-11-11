/*!
 * session-cache <https://github.com/doowb/session-cache>
 *
 * Copyright (c) 2014 Brian Woodward
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Session storage
 */

var storage = require('./lib/storage');

/**
 * Backup cache
 */

var cache = require('./lib/cache');

/**
 * Set a heuristic for determining if the session
 * is actually active.
 *
 * @return {Boolean} Returns `true` if session is active
 * @api private
 */

var isActive = function isActive() {
  try {
    var key = '___session is active___';
    return session.get(key) || session.set(key, true);
  } catch (err) {
    return false;
  }
};

/**
 * Create a session with the given `name`
 *
 * ```js
 * var session = require('session')('your app');
 * ```
 *
 * @name createSession
 * @param  {String} `name`
 * @return {Object}
 * @api public
 */

module.exports = function createSession(name) {
  var session = storage.get(name) || storage.create(name);

  /**
   * Create a context to run in.
   *
   * @param {Function} `fn` function to run in the session context
   * @api private
   */

  exports.run = session.run.bind(session);

  /**
   * Assign `value` on the current session to `key`.
   *
   * @param {String} `key`
   * @param  {*} `value`
   * @return {*} Returns the set value.
   * @api public
   */

  exports.set = function set(key, value) {
    if (isActive()) {
      return session.set(key, value);
    }
    return cache.set(key, value);
  };

  /**
   * Get the stored value of `key` from the current session.
   *
   * @param  {String} `key`
   * @return {*} Value of the key or undefined
   * @api public
   */

  exports.get = function get(key) {
    if (isActive()) {
      return session.get(key);
    }
    return cache.get(key);
  };

  return exports;
};
