let model = require("../models/vip.js");
const async = require("async/index");

/////////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = function(request, response){
    let lettre = request.params.lettre;
    let nom = request.params.nom;
    response.title = 'Répertoire des stars';

    async.parallel ([
        function(callback){
            model.repertoirVips(function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.initTous(lettre,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.repertoireNom(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.toutesPhotos(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.estCouturier(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.estMannequin(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.estChanteur(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.estActeur(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.estRealiseur(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.estMarier(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.joueDans(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.liaison(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.defilePour(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.chanteCela(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.aCousuCela(nom,function(err, result) {callback(null,result) });
        },

        function(callback) {
            model.aRealiseCela(nom,function(err, result) {callback(null,result) });
        },
    ],
        function(err,result){
            if (err) {
                console.log(err);
                return;
            }
            response.initVip = result[0];

            response.initTous = result[1];

            response.nomTout = result[2];

            response.toutesPhotosPerso = result[3];
            response.estCouturier = result[4];
            response.estMannequin = result[5][0];
            response.estChanteur = result[6][0];
            response.estActeur = result[7][0];
            response.estRealiseur = result[8][0];

            response.estMarier = result[9];

            response.joueDans = result[10];
            console.log(result[10]);

            response.liaison = result[11];

            response.defilePour = result[12];

            response.chanteCela = result[13];

            response.aCousuCela = result[14];

            response.aRealiseCela = result[15];

            response.render('repertoireVips', response);
        }
    );
}
