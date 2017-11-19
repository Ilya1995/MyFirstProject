
var stream;

try {
  // mag-stream tries to requare top level mag-hub module
  // mag-hub is not in dependencies of mag-stream
  stream = require('mag-hub');
} catch (err) {
  // if it fails then mag-stream require mag-fallback
  // mag-fallback is in dependencies of mag-stream
  stream = require('mag-fallback');
}

// in both cases, it returns writable stream
module.exports = stream;
