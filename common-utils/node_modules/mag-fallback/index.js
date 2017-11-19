
var util = require('util');
var Transform = require('readable-stream/transform');

var fallback = new Transform({objectMode: true});

var severityNames = [
  'EMERG',
  'ALERT',
  'CRIT',
  'ERROR',
  'WARN',
  'NOTICE',
  'INFO',
  'DEBUG'
];

fallback._transform = function(data, encoding, cb) {
  var severity = severityNames[data.severity] || 'DEBUG';
  data.timestamp = data.timestamp || new Date();

  if (!data.message){
    if (data.arguments) {
      data.message = util.format.apply(this, data.arguments) + '\n';
    } else {
      data.message = 'something wrong, arguments are not specified: ' +
        util.inspect(data) + '\n';
    }
  }

  var str = data.timestamp.toLocaleTimeString() + '.' +
    data.timestamp.getMilliseconds();

  if (data.namespace) {
    str += ' [' + data.namespace + ']';
  }

  str += ' <' + severity + '> ' + data.message;

  cb(null, str);
};

fallback.pipe(process.stdout);

module.exports = fallback;


