/**
 * Stubs for use in tests
 */
var crypto = require('crypto');
var Chancejs = require('chance');
// Instantiate Chance so it can be used
var chancejs = new Chancejs();
var stubs = {};

stubs.userStub = function userStub() {
  var randString = crypto.randomBytes(20).toString('hex');
  return {
    username: randString.slice(0,15),
    biography:  randString + ' is a auto generated user!',
    email:  randString + '@albertosouza.net',
    password: '123',
    displayName: 'Afro Samuray',
    language: 'pt-br',
    active: true
  }
}

stubs.vocabulárioStub = function vocabulárioStub(userId) {
  return {
    creator: userId,
    name: 'Temas da comunidade',
    description: 'Vocabulário com os temas da Comunidade de Práticas'
  }
}

stubs.categoryStub = function categoryStub(userId, vocabularyId) {
  if (!vocabularyId) throw 'vocabularyId is required for stubs.categoryStub';

  return [{
    text: 'Saúde',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Educação',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Humanização',
    creator: userId,
    vocabulary: vocabularyId
  }]
}

stubs.tagStub = function tagStub(userId) {
  return [{
    text: 'test',
    creator: userId
  },
  {
    text: 'Educação',
    creator: userId
  },
  {
    text: 'Otra tag',
    creator: userId
  }]
}

stubs.relatoperguntaStubs = function relatoperguntaStubs(userId) {
  return [{
    creator: userId,
    body: 'Qual foi a experiência desenvolvida? Sobre o que foi?',
    'categorias':[1,2]
  },
  {
    creator: userId,
    body: 'Como funciona(ou) a experiência?',
    'categorias':[2,3]
  }
  ];
};

stubs.relatorespostaStubs = function relatorespostaStubs(userId, relatoId, perguntaId) {
  return [{
    creator: userId,
    inRelato: relatoId,
    pergunta: perguntaId,
    body: chancejs.paragraph()
  },
  {
    creator: userId,
    inRelato: relatoId,
    pergunta: perguntaId,
    body: chancejs.paragraph()
  }
  ];
};

stubs.relatoStub = function relatoStub(userId, categorias, tags) {
  var relato = {
    'creator': userId,
    'published': false,
    'titulo': chancejs.sentence({words: 6}),
    'descricao': chancejs.paragraph(),
    'categorias':[1,2,23133], // term 23133 is invalid and skip it
    'tags':[
      {'id':'teste','text':'teste','isNew':true},
      {'id':'teste','text':'teste','isNew':true},
      {'id':'natureza','text':'natureza','isNew':true},
      {'id':'saúde','text':'saúde','isNew':true}
    ]
  };

  if( categorias) {
    relato.categorias = categorias;
  }

  if (tags) {
    relato.tags = tags;
  }

  return relato;
};

stubs.groups = function groups(userId){
  return [
  {
    name: chancejs.sentence({words: 3}),
    privacity: 'public',
    creator: userId
  },
  {
    name: chancejs.sentence({words: 3}),
    privacity: 'restrict',
    creator: userId
  },
  {
    name: chancejs.sentence({words: 3}),
    privacity: 'hidden',
    creator: userId
  }
  ];
};

stubs.group = function groupStup(userId) {
  return {
    name: chancejs.sentence({words: 6}),
    description: chancejs.paragraph(),
    type: 'group',
    creator: userId,
    privacity: 'public'
  }
}

stubs.post = function(creatorId) {
  return {
    creator: creatorId,
    body: chancejs.paragraph()
  }
}

module.exports = stubs;
