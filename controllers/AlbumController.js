// ////////////////////// L I S T E R     A L B U M S
let model = require("../models/vip.js");

module.exports.ListerAlbum = async function (request, response) {
    response.vips = model.getAllVips();
    response.num_page=0;
    response.vip_num=0;
    response.content = 'Choisissez un vip pour voir ses photos';
    response.render('listerAlbum', response);
};

module.exports.ListerPhoto = async function (request, response) {
    response.vips =model.getAllVips();
    response.listerPhoto = model.getAllPhotoVips(request.params.vip_numero);
    response.vip_num = request.params.vip_numero;
    response.num_page = request.params.page_menu;
    response.content = "Il n'y a pas de photos disponible pour ce vip";
    response.render("listerAlbum", response);
};