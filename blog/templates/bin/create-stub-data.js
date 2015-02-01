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

        var whantsCreateUser = sget('You want create a user? \n y or n?');
        // remove \n
        whantsCreateUser = whantsCreateUser.replace('\n','');
        if ( whantsCreateUser === 'y') {
          createUserFN(function(err, u) {
            if (err) return done(err);
            user = u;
            done();
          })
        } else {
          User.find().limit(1).exec(function(err, u) {
            if (err) return done(err);
            user = u[0];
            done();
          })
        }
      },

      function createVocabulary(done){
        Vocabulary.create({
          creator: user.id,
          name: 'Temas da comunidade',
          description: chancejs.sentence({words: 3}),
        })
        .exec(function(err, v){
          if (err) return done(err);
          if (!v) return done('vocabularies dont created', err, v);

          sails.log.verbose('vocabulary created:', v);

          vocabulary = v;
          done();
        });
      },
      function createTemas(done){
        Term.create(stubTemas(user.id, vocabulary.id))
        .exec(function(err, terms){
          if (err) return done(err);
          categories = terms;
          done();
        });
      },
      function createRelatoPergunta(done) {
        var Pergunta = sails.models.relatopergunta;
        Pergunta.create(relatoPerguntaStumb(user.id))
        .exec(function(err, perguntas){
          if (err) return done(err);
          done();
        });
      },
      function createRelato(done) {
        var exampleRelatos = relatosStub(user.id);
        var clone = _.clone(exampleRelatos);
        Relato.create(exampleRelatos)
        .exec(function(err, relatos) {
          if (err) return done(err);
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


var stubTemas = function(userId, vocabularyId){
  return [
  {
    text: 'Monitoramento e Avaliação em Saúde',
    creator: userId,
    description: 'Compartilhar experiências de organização de sistemas de monitoramento e avaliação desenvolvidos no âmbito do Sistema Único de Saúde, com vista à melhoria do processo de trabalho e de cuidado, bem como mostrar resultados provenientes de tais práticas.<br>Esta categoria contempla as experiências de equipes e municípios no Programa Nacional de Melhoria do Acesso e Qualidade (PMAQ-AB) e outras experiências desenvolvidas no âmbito da avaliação de desempenho das equipes.',
    vocabulary: vocabularyId
  },
  {
    text: 'Humanização no Sistema Único de Saúde',
    creator: userId,
    description: 'Incentivar a troca de experiências de Humanização no âmbito do Sistema Único de Saúde, tendo como pano de fundo a valorização dos processos de mudança dos sujeitos e a democratização das instituições na produção do cuidado. Nesse sentido, entende-se a qualidade da ambiência e estrutura como princípios norteadores, não apenas como espaço físico, mas como espaço social, profissional e de relações interpessoais, são instrumentos importantes para  o processo de trabalho favorecendo a otimização de recursos e o atendimento acolhedor, humanizado e resolutivo.',
    vocabulary: vocabularyId
  },
  {
    text: 'Intersetorialidade e Promoção da Saúde',
    creator: userId,
    description: 'Compartilhar e debater as práticas de promoção da saúde e as ações intersetoriais, reunindo experiências que busquem a melhoria da qualidade de vida da população e reduzam vulnerabilidade e riscos à saúde relacionados aos seus determinantes e condicionantes – hábitos de vida, condições de trabalho, habitação, ambiente, educação, lazer, cultura, acesso a bens e serviços essenciais. Abarca também as experiências de Educação em Saúde e de Educação Popular em Saúde realizadas nos diferentes espaços de convivência dos territórios, com destaque para as experiências que articulem a produção de mudanças no modo de andar a vida dos sujeitos com a produção de mais autonomia, valorizando a diversidade cultural e a participação social. Nesse sentido, temos como foco projeto de saúde para a comunidade, como projeto de saúde do território,  abordagem comunitária,  territórios de cidadania, Academia da Saúde, Programa Saúde na Escola, ações vinculadas ao Bolsa Família,  atividades coletivas (em grupos) e demais ações que envolvam a produção da saúde em um território.',
    vocabulary: vocabularyId
  },
  {
    text: 'Controle social e participação política',
    description: 'Estimular, por meio da troca de experiências, o aprimoramento das estratégias de controle social e participação política na gestão do SUS.',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Gestão do Trabalho e Educação Permanente em Saúde',
    description: 'Promover o diálogo entre as experiências que colocam na cena a reflexão sobre a Política Nacional de Educação Permanente e a qualificação dos profissionais nos espaços de gestão, atenção, participação popular e ensino, refletindo sobre os impactos desta formação cotidiana, que possibilita o diálogo entre os saberes instituídos e outros saberes além dos ditos "científicos". Compartilhar experiências sobre o processo de trabalho, o provimento, a valorização, a fixação, a remuneração e a formação do trabalhador da saúde.  Abordar as ações de integração entre instituições de ensino e serviços de saúde, explorando os espaços formais, como as Comissões de Integração Ensino-Serviço  (CIES) e os Contratos Organizativos da Ação Pública Ensino-Saúde ou de iniciativas originais e inovadoras.<br>Dessa forma esta categoria inclui experiências como o PROVAB, o Programa Mais Médicos, o PMAQ,  o Telessaúde,  o PET-Saúde, Residências, UNA-SUS,  estágios de vivência, apoio institucional e outras ações de Educação Permanente em Saúde,  gestão do trabalho  e formação profissional realizadas em âmbito nacional ou local.',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Redes de Atenção à Saúde e Gestão do Cuidado',
    description: 'Identificar e debater sobre experiências de gestão do cuidado em saúde e organização dos fluxos de atenção nos diferentes municípios e regiões. Esta categoria inclui experiências relacionadas às organização das Redes de Atenção à Saúde (Rede de Urgência e Emergência, a Rede Cegonha, a Rede de Atenção Psicossocial, a Rede de Atenção às Pessoas com Deficiência, Rede de Atenção às Pessoas com Doenças Crônicas); à implantação de Linhas de Cuidado prioritárias; e à construção de Carteiras de Serviços (serviços prestados na rede).<br>No âmbito local, aqui também pretendemos conhecer mais sobre as múltiplas experiências de gestão do cuidado nos territórios, incluindo temas como o compartilhamento de responsabilidades entre a equipe (atribuições, competências, espaços de troca e desafios para o compartilhamento e coordenação do cuidado) e a utilização de instrumentos de referência para o apoio à tomada de decisão clínica (protocolos assistenciais e diretrizes terapêuticas). Neste sentido, buscamos reunir aqui também as ações de cuidado da equipe em áreas estratégicas relacionadas a condições de saúde prevalentes na comunidade, como saúde da criança, saúde bucal, saúde mental, atenção domiciliar, saúde do homem, saúde da mulher, saúde do idoso, doenças respiratórias, hipertensão, diabetes, obesidade, agravos nutricionais, prevenção e controle do câncer do colo de útero e mama, Práticas Integrativas e Complementares (PICs) e outras condições relevantes ou serviços ofertados para as populações atendidas.',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Apoio Matricial',
    description: 'Promover o debate sobre a implementação das equipes de Apoio Matricial e da prática do matriciamento para a integração das ações conjuntas, a constituição de equipes interdisciplinares e o desenvolvimento de Projetos Terapêuticos Singulares. Nesse  sentido, o  apoio matricial abarca s dimensões de suporte assistencial e técnico-pedagógico. A dimensão assistencial é aquela que vai produzir ação clínica direta com os usuários, como os atendimentos compartilhados e as atividades coletivas compartilhadas, e a ação técnico-pedagógica vai produzir ação de apoio educativo com e para a equipe. Este trabalho em colaboração traz para o processo de trabalho do SUS melhora da resolutividade e ampliação do acesso p por meio de intervenções individuais, familiares, comunitárias e, sobretudo, pela integralidade das ações das equipes de saúde.<br>A proposta do trabalho em colaboração pelo Apoio Matricial se aproxima da educação permanente pois produz, pela sua conformação, o diálogo entre diferentes categorias profissionais de saúde, o que tem se tornado uma necessidade constante. Os Núcleos de Apoio  à Saúde da Família são o principal exemplo do  trabalho pautado na lógica no apoio matricial, mas esta categoria inclui também as equipes de retaguarda especializada que exercem apoio matricial às equipes de referência, como o Caps ou outros especialistas.<br>A intenção dessa categoria é a de conhecer como esse processo tem sido vivido pelos profissionais de saúde, qual a sua oferta  e os seus rearranjos no cotidiano.',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Tecnologias de Informação na Saúde e Cibercultura',
    description: 'Compartilhar experiências de organização de processos de implantação de tecnologias e sistemas de informação na saúde, tais como: prontuário eletrônico, e-SUS,  teleconsultorias, atividades de educação à  distância como o UNA-SUS, Telessaúde, bibliotecas virtuais de saúde, informes digitais, Blogs, Redes Virtuais do SUS, comunidades de práticas e outras redes sociais.<br>Nos dias atuais a internet e a comunicação digital é uma tendência que tem ocupado parte importante do tempo de muitos trabalhadores do SUS. Essa categoria foi criada pensando nos veículos de comunicação por meio digital e no impacto da Cibercultura na forma de nos comunicarmos sobre os nossos processos de trabalho.<br>Com isso, pretende-se discutir e compartilhar como essas ferramentas tem influenciado o processo de trabalho, que  podem ser relatados desde a sua concepção até a sua utilização cotidiana.',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Práticas de Vigilância em Saúde',
    description: 'Promover a discussão e a troca de experiências sobre as diferentes estratégias desenvolvidas pelas equipes de saúde em relação às ações de vigilância em saúde no território, assim como experiências de planejamento e gestão em saúde com base nas informações produzidas pelas práticas de vigilância na Atenção Básica - além da articulação com ações derivadas do processo de vigilância para integralidade da atenção à saúde. O conceito de Vigilância em Saúde inclui: vigilância e controle das doenças transmissíveis; vigilância das doenças e agravos não transmissíveis; vigilância da situação de saúde; vigilância  alimentar e  nutricional; vigilância ambiental em saúde, vigilância da saúde do trabalhador e vigilância sanitária.',
    creator: userId,
    vocabulary: vocabularyId
  },
  {
    text: 'Equidade e Populações Específicas',
    description: 'Promover o debate sobre equidade e dar visibilidade às experiências de trabalho desenvolvidas pelas equipes de saúde junto a populações específicas, tais como população em situação de rua, população ribeirinha, quilombolas,  população LGBTT, população do campo, da floresta e águas, população  negra, povos indígenas entre outros populações que se reconheça especificidades de gênero, geração, raça, etnia, orientação sexual e processo de trabalho.',
    creator: userId,
    vocabulary: vocabularyId
  }
  ];
}

var relatoPerguntaStumb = function(userId){
  return [{
    creator: userId,
    body: 'Sobre qual experiência você quer contar?',
    categorias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    creator: userId,
    body: 'O que você gostaria de contar sobre a experiência?',
    ajuda: 'Para te ajudar com essa resposta, a CdP te sugere pensar em:<br>Como a equipe se organizou para realizar a experiência?<br>Se trata de uma experiência planejada?<br>Quais foram as etapas do trabalho realizado?<br>Houve apoio local? Como a proposta foi acolhida?',
    categorias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    creator: userId,
    body: 'O que você e a sua equipe aprenderam com essa experiência?',
    ajuda: 'A experiência modificou o processo de trabalho? Como?  Ajudou a pensar estratégias para outras ações?',
    categorias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    creator: userId,
    body: 'Que desafios foram encontrados para o seu desenvolvimento?',
    categorias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    creator: userId,
    body: 'O que você mais gostou e o que você não gostou?',
    categorias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    creator: userId,
    body: 'Pensando no que você descreveu sobre a sua experiência, o que mais ainda pode ser feito ?',
    ajuda: 'O que você faria diferente, se pudesse?',
    categorias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    creator: userId,
    body: 'Pra fechar, deixamos um campo aberto onde você pode escrever o que quiser e no formato que quiser. ;)',
    categorias: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
  ];
}

function relatosStub(userId) {
  return [{
    'creator': userId,
    'published': false,
    'titulo': 'SORRISO GERA SORRISO',
    'descricao': 'Este projeto foi desenvolvido para os alunos do Ensino Fundamental de uma escola pública de Maceió/AL e de uma unidade de saúde da Serra da Mandioca, em Palmeira dos Índios. Imagine como seria viver sem escovar os dentes? Além do mau hálito, as pessoas acabariam desdentadas! Uma boa higiene bucal é uma das medidas mais importantes que você pode adotar para manter seus dentes e gengivas saudáveis. A boca merece muita atenção, porque é um local que nos mostra como vai a saúde de uma maneira geral.',
    'categorias': [1,2],
    //'tags': [1,2]
  },
  {
    'creator': userId,
    'published': false,
    'titulo': 'Campanha "Cuidado com a sua boca"',
    'descricao': 'Criada em 1985 pelo Setor de Saúde Bucal, abrangendo 6.039 estudantes, são realizadas nas escolas do município a distribuição de escovas e cremes dentais, aplicação tópica de flúor por mês com acompanhamento dos profissionais, realizações de palestras e evidenciação de placa bacteriana com brincadeiras e jogos. No ano de 2011, de 21.662 atendimentos de crianças de 6 a 12 anos realizados pelo SUS, somente 14 crianças tiveram extrações do 1º molar permanente, sinalizando a eficácia da campanha.',
    'categorias': [3,4],
    //'tags': [2,3]
  },
  {
    'creator': userId,
    'published': false,
    'titulo': 'PROVANDO A ATENÇÃO BÁSICA EM ALAGOAS',
    'descricao': 'Após 2 anos de experiências exitosas no Programa de Valorização do Profissional da Atenção Básica (PROVAB) em Alagoas, trazemos os relatos dos médicos e médicas que tornaram esta "provação" da Atenção Básica em Alagoas uma realidade de muitos "causos" e experiências de sucesso que marcaram a Saúde Pública em nosso Estado.',
    'categorias':[5,6],
    //'tags':[1,2]
  },
  {
    'creator': userId,
    'published': false,
    'titulo': 'Do Cerrado aos Pampas',
    'descricao': 'Tudo começou com o convite de um amigo para participar da Curadoria. Não sabia como seria e nem se teria tempo, mas me inscrevi. Fiquei tão feliz quando fui selecionada que reorganizei minhas prioridades e fiz minhas malas. Durante a I Oficina percebi que as ideias eram muitas e não havia um fluxo definido. Isso gerou certo receio, mas com o início do trabalho compreendi o quanto minhas experiências, de norte a sul, poderiam ser enriquecedoras e, principalmente, enriquecidas pela Curadoria.',
    'categorias':[7,8],
    // 'tags':[
    //   {'id':'teste','text':'teste','isNew':true}
    // ]
  }
  ];
}

init();