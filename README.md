# winston-lludol
[![dependencies status](https://david-dm.org/lludol/winston-lludol/status.svg)](https://david-dm.org/lludol/winston-lludol#info=dependencies)
[![dev-dependencies status](https://david-dm.org/lludol/winston-lludol/dev-status.svg)](https://david-dm.org/lludol/winston-lludol#info=devDependencies)
[![Build Status](https://travis-ci.org/lludol/winston-lludol.svg?branch=master)](https://travis-ci.org/lludol/winston-lludol)
[![Coverage Status](https://coveralls.io/repos/github/lludol/winston-lludol/badge.svg?branch=master)](https://coveralls.io/github/lludol/winston-lludol?branch=master)
[![npm version](https://badge.fury.io/js/winston-lludol.svg)](https://badge.fury.io/js/winston-lludol)

A module with [winston](https://github.com/winstonjs/winston) preconfigured.

# Install

```bash
npm install --save winston-lludol
```

# Example

```js
const logger = require('winston-lludol');
// logger is created with winston.createLogger

// So you have access to every winston method
logger.error('example - error');
logger.warn('example - warn');
logger.info('example - info');
logger.verbose('example - verbose');
logger.debug('example - debug');
logger.silly('example - silly');

logger.info('[category] example');
logger.debug('example with meta', {foo: 'bar'});

```

# Screenshot

![Alt text](./screenshot.png?raw=true "Output examples")

# More information

The default transport is a custom ```winston.transports.Console```.

Levels and colors available (default value from ```winston.config.npm```):
```js
{
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'magenta'
}
```

The [winston documentaiton](https://github.com/winstonjs/winston).

## License

[MIT](LICENSE)
