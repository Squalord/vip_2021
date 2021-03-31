var async = require('async');
let model = require("../models/vip.js");

module.exports.Article = function (request, response) {
  response.title = "Article des stars";
  model.getVipsArticle(function(err, resultat) {
    if(err) {
      console.error(err);
      return;
    }
    response.personne = resultat;
    response.render('article', response);
  });

}

module.exports.ArticlePersonne = function (request, response) {
  const idPerson = request.params.id;
  response.title = "Article des stars";

  async.parallel ([
    function (callback) {
      model.getVipsArticle(function(err, resultat){callback(null, resultat)});
    },
    function (callback) {
      model.getTargetArticle(idPerson ,function(err, resultat) {callback(null, resultat)});
    }
  ],
  function(err, result) {
    if(err) {
      console.error(err);
      return;
    }
    response.personne = result[0];
    response.articlePersonne = result[1][0];
    console.log(result[1][0]);
    response.render('articlePersonne', response);

  });
};
