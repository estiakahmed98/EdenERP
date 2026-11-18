'use strict';

// Conservative local mitigation for GHSA-fc5q-39xc-vjpf. Reject repeated
// extglobs before compiling a regex, including nested and single-branch forms.
// The watcher's directory ignores use ordinary **/directory/** globs.
module.exports = function assertSafeExtglobs(input) {
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] === '\\') {
      i++;
      continue;
    }

    if ((input[i] === '+' || input[i] === '*') && input[i + 1] === '(') {
      throw new SyntaxError('Repeated extglobs are disabled by the EdenERP security patch');
    }
  }
};
