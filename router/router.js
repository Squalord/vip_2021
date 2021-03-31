let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let TestController = require('./../controllers/TestController');
let ArticleController = require('./../controllers/ArticleController');


// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:lettre', VipController.Repertoire);
    app.get('/repertoire/personne/:nom', VipController.Repertoire);


 // albums
    app.get('/album', AlbumController.ListerAlbum);
    app.get('/album/:vip_num', AlbumController.ListerAlbum);

// article
    app.get('/articles', ArticleController.Article);
    app.get('/articles/:id', ArticleController.ArticlePersonne);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
