'use strict';

var utils = require('readline-utils');

module.exports = function emit(prompt, val) {
  prompt.once('ask', function() {
    setImmediate(function() {
      if (Array.isArray(val)) {
        for (var i = 0; i < val.length; i++) {
          utils.emitKey(prompt.ui.input, String(val[i]));
        }
      } else if (typeof val === 'number') {
        utils.emitKey(prompt.ui.input, String(val));

      } else if (typeof val !== 'string') {
        throw new TypeError('expected answer value to be a string or number');

      } else {
        prompt.rl.write(val.replace(/\n+$/, ''));
      }
      prompt.rl.write('\n');
    });
  });
};

/**
 * Get the `.up`, `.down`, `.left` and `.right` values to use
 * on an answer.
 *
 * @name .keys
 * @return {Object}
 * @api public
 */

module.exports.keys = {
  up: '\u001b[A',
  down: '\u001b[B',
  left: '\u001b[D',
  right: '\u001b[C'
};
