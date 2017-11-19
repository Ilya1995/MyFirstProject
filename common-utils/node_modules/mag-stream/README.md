# mag-stream [![Build Status](https://travis-ci.org/mahnunchik/mag-stream.svg)](https://travis-ci.org/mahnunchik/mag-stream)

[Mag](https://github.com/mahnunchik/mag) logger magic module

## What it does?

* *mag-stream* tries to require top level *mag-hub* module
* if it fails then *mag-stream* requires *mag-fallback*
* in both cases, module returns writable stream

*mag-fallback* is in dependencies of *mag-stream*

*mag-hub* is **not** in dependencies of *mag-stream*

## License

[MIT](https://github.com/mahnunchik/mag-stream/blob/master/LICENSE)

