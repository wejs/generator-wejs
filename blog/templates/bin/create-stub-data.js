/**
 * A helper script to create content for we-cdp
 */

var async = require('async');
var sget = require('sget');
var _ = require('lodash');
var Chancejs = require('chance');
var chancejs = new Chancejs();

var loadSails = require('./loadSails.js');
var createUserFN = require('../node_modules/we-plugin-user/bin/createUserFN.js');

function init() {
  return loadSails(function afterLoadSails(err, sails) {
    var user;
    var vocabulary;
    var categories;

    return async.series([
      function createUser(done) {
        User.find().limit(1).exec(function(err, u) {
          if (err) return done(err);
          if (!u) return done('Create one user after create stub data');
          user = u[0];
          done();
        })
      },

      function createVocabulary(done){
        Vocabulary.create({
          creator: user.id,
          name: 'Categories',
          description: chancejs.sentence({words: 3}),
        })
        .exec(function(err, v){
          if (err) return done(err);
          if (!v) return done('Error on create one vocabulary', err, v);
          sails.log.info('New vocabulary:', v);
          vocabulary = v;
          done();
        });
      },
      function createCategories(done){
        Term.create(stubCategories(user.id, vocabulary.id))
        .exec(function(err, terms){
          if (err) return done(err);

          sails.log.info('New categories:', terms.map(function(item){ return item.text }));
          categories = terms;
          done();
        });
      },
      function createArticles(done) {
        var articlesE = [];
        for (var i = categories.length - 1; i >= 0; i--) {
          articlesE = articlesE.concat(exampleArticles(user.id, categories[i].id));
        };
        Article.create(articlesE)
        .exec(function(err, articles) {
          if (err) return done(err);
          sails.log.info('Created ' + articles.length + ' articles.' );
          done();
        });
      }
      ], doneAll)
  })
}

function doneAll(err){
  if ( err ) {
    sails.log.error('Error on create stub data', err);
  }
  //sails.load();
  // end / exit
  process.exit();
}


var stubCategories = function(userId, vocabularyId) {
  return [
  {
    text: 'Tecnology',
    creator: userId,
    description: '',
    vocabulary: vocabularyId
  },
  {
    text: 'Games',
    creator: userId,
    description: '',
    vocabulary: vocabularyId
  },
  {
    text: 'Movies',
    creator: userId,
    description: '',
    vocabulary: vocabularyId
  },
  {
    text: 'Space',
    description: '',
    creator: userId,
    vocabulary: vocabularyId
  }
  ];
}

function exampleArticles(userId, categoryId) {
  var articles = [];

  for (var i = 3 - 1; i >= 0; i--) {
    articles.push({
      'creator': userId,
      'published': false,
      'title': chancejs.sentence({words: 4}) ,
      'about': chancejs.paragraph({sentences: 3}),
      'body': chancejs.paragraph({sentences: 20}),
      'category': [categoryId]
      //'tags': [1,2]
    });
  };

  return articles;
}

init();