# We.js generator | generator-wejs [![Build Status](https://secure.travis-ci.org/wejs/generator-wejs.png?branch=master)](https://travis-ci.org/wejs/generator-wejs)

> A [Yeoman](http://yeoman.io) generator for generate [we.js](https://github.com/wejs) projects, plugins, themes and clientside modules

## Features

 - yo wejs:blog :white_check_mark: ( for create blog project )
 - yo wejs:plugin :white_check_mark:
 - yo wejs:theme :white_check_mark:
 - yo wejs:widget :white_check_mark:
 - yo wejs:helper :white_check_mark:
 - yo wejs:resource :white_check_mark:

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

### Generate one simple app structure

```sh
yo wejs:app
```

### Generate one we.js plugin

```sh
yo wejs:plugin
```

### Generate one we.js theme

```sh
yo wejs:theme
```

### Generate one we.js blog project

```sh
yo wejs:blog
```

### Generate one we.js template helper file

```sh
yo wejs:helper
```

### Generate resource CRUD

```sh
yo wejs:resource attr1:type attr2:type
```

### Generate Swagger documentation

```sh
yo wejs:doc
```

### How to test

```sh
we test
```

##### For run only 'wejs:plugin' test use:

```sh
we-test -g 'wejs:plugin'
```

## Magicaly update all project generators 

```sh 
npm run upp
```

## Links

> * We.js site: http://wejs.org

## Sponsors

- Linky - https://linkysystems.com

## License

MIT License Copyright © 2015-present, Alberto Souza

