# We.js generator v0.3.x | generator-wejs [![Build Status](https://secure.travis-ci.org/wejs/generator-wejs.png?branch=master)](https://travis-ci.org/wejs/generator-wejs)

> A [Yeoman](http://yeoman.io) generator for generate [we.js](https://github.com/wejs) projects, plugins, themes and clientside modules

## Features

 - yo wejs :construction: ( for create one project )
 - yo wejs:blog :white_check_mark: ( for create blog project )
 - yo wejs:plugin :white_check_mark:
 - yo wejs:theme :construction:
 - yo wejs:emberjs :construction: ( for ember.js features )

## Requirements

 - Yeoman duuhh!

install it with ```npm```

```bash
npm install -g yo
```

## Getting Started

### What is this npm module?

It generate structures for we.js features like plugins. with example files, configs and tests


### How to install the generator

To install generator-wejs from npm, run:

```bash
npm install -g generator-wejs
```

## How to generate things?

### For generate one simple app structure

```sh
yo wejs:app
```

### For generate one we.js plugin

```sh
yo wejs:plugin
```

### For generate one we.js theme

```sh
yo wejs:theme
```

### For generate one we.js social network project
TODO!

### For generate one we.js blog project

TODO!


### How to test

```sh
npm test
```

##### For run only 'wejs:plugin' test use:

```sh
NODE_ENV=test LOG_LV=info ./node_modules/.bin/mocha test/test-*.js -g 'wejs:plugin'
```

## Links

> * We.js site: http://wejs.org

## Copyright and license

Copyright 2013-2015 Alberto Souza <alberto.souza.99@gmail.com> and [contributors](https://github.com/wejs/generator-wejs/graphs/contributors) , under [the MIT license](LICENSE).

