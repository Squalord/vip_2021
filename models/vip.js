let db = require('../configDb.js');

// {{formatDate Celebrity.VIP_NAISSANCE 'dddd D MMMM YYYY' }}

module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getAllVips = function(callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql ="SELECT DISTINCT VIP_NOM, VIP_PRENOM, VIP_NUMERO FROM vip ORDER BY VIP_NUMERO asc ";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getAllPhotoVips = function(callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT DISTINCT VIP_NOM, VIP_PRENOM, v.VIP_NUMERO, PHOTO_NUMERO, PHOTO_ADRESSE
                        FROM vip v JOIN photo c on v.VIP_NUMERO=c.VIP_NUMERO
                        ORDER BY VIP_NUMERO asc `;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.repertoirVips = function(callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql ="SELECT DISTINCT LEFT(VIP_NOM, 1) AS initial FROM vip ORDER BY VIP_NOM asc ";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.initTous = function(lettre, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT V.VIP_PRENOM, V.VIP_NOM ,PHOTO_ADRESSE FROM photo P JOIN vip V ON P.VIP_NUMERO=V.VIP_NUMERO WHERE PHOTO_NUMERO=1 AND LEFT(VIP_NOM, 1) = '${lettre}' ORDER BY V.VIP_NOM asc`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.repertoireNom = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT v.VIP_NOM, v.VIP_PRENOM,v.VIP_TEXTE, p.PHOTO_ADRESSE, n.NATIONALITE_NOM
                        FROM vip v, nationalite n, photo p
                        where VIP_NOM= '${nom}'AND p.VIP_NUMERO=v.VIP_NUMERO
                        group by v.VIP_NOM, v.VIP_PRENOM`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.toutesPhotos = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT p.PHOTO_ADRESSE, p.PHOTO_NUMERO, p.PHOTO_SUJET, p.PHOTO_COMMENTAIRE from photo p, vip v where v.VIP_NOM='${nom}' and v.VIP_NUMERO=p.VIP_NUMERO`;

            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.estCouturier = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT c.VIP_NUMERO from couturier c, vip v where v.VIP_NOM='${nom}' and c.VIP_NUMERO=v.VIP_NUMERO`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.estMannequin = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT m.VIP_NUMERO from mannequin m, vip v where v.VIP_NOM='${nom}' and m.VIP_NUMERO=v.VIP_NUMERO`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.estChanteur = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT c.VIP_NUMERO from chanteur c, vip v where v.VIP_NOM='${nom}' and c.VIP_NUMERO=v.VIP_NUMERO`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.estActeur = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT a.VIP_NUMERO from acteur a, vip v where v.VIP_NOM='${nom}' and a.VIP_NUMERO=v.VIP_NUMERO`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.estRealiseur = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT r.VIP_NUMERO from realisateur r, vip v where v.VIP_NOM='${nom}' and r.VIP_NUMERO=v.VIP_NUMERO`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.estMarier = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT m.VIP_NUMERO, vi.VIP_NOM, vi.VIP_PRENOM, m.DATE_EVENEMENT, m.MARIAGE_LIEU, m.MARIAGE_FIN, p.PHOTO_ADRESSE,  LEFT(vi.VIP_TEXTE, 50) as VIP_TEXTE
                        from mariage m, vip v, vip vi, photo p
                        where vi.VIP_NUMERO=p.VIP_NUMERO AND v.VIP_NOM='${nom}'
                        and m.VIP_NUMERO=v.VIP_NUMERO and m.VIP_VIP_NUMERO=vi.VIP_NUMERO and p.PHOTO_NUMERO=1`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.liaison = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT l.VIP_NUMERO, vi.VIP_NOM, vi.VIP_PRENOM, l.LIAISON_MOTIFFIN, l.DATE_EVENEMENT, p.PHOTO_ADRESSE,  LEFT(vi.VIP_TEXTE, 50) as VIP_TEXTE
                        from liaison l, vip v, vip vi, photo p
                        where vi.VIP_NUMERO=p.VIP_NUMERO and
                        v.VIP_NOM= '${nom}' and l.VIP_NUMERO=v.VIP_NUMERO and
                        l.VIP_VIP_NUMERO=vi.VIP_NUMERO and p.PHOTO_NUMERO=1`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.joueDans = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT role_nom, film_titre, film_daterealisation, vip2.vip_nom as VIP_NOM, vip2.vip_prenom as VIP_PRENOM, vip2.vip_numero ,  p.PHOTO_ADRESSE,  LEFT(vip2.VIP_TEXTE, 50) as VIP_TEXTE
                FROM vip JOIN acteur ON vip.vip_numero = acteur.vip_numero
                JOIN joue ON acteur.vip_numero = joue.vip_numero
                JOIN film ON joue.film_numero = film.film_numero
                JOIN vip vip2 ON film.vip_numero = vip2.vip_numero
                JOIN photo p on vip2.VIP_NUMERO=p.VIP_NUMERO
                WHERE vip.vip_nom = '${nom}'and p.PHOTO_NUMERO=1`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.defilePour = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT vi.VIP_NOM, vi.VIP_PRENOM, d.DEFILE_LIEU, d.DEFILE_DATE,  p.PHOTO_ADRESSE, LEFT(vi.VIP_TEXTE, 50) as VIP_TEXTE
                        FROM vip v
                        JOIN mannequin m on v.VIP_NUMERO=m.VIP_NUMERO
                        JOIN defiledans dd on m.VIP_NUMERO=dd.VIP_NUMERO
                        JOIN defile d on dd.DEFILE_NUMERO=d.DEFILE_NUMERO
                        JOIN couturier c on d.VIP_NUMERO=c.VIP_NUMERO
                        JOIN vip vi on c.VIP_NUMERO=vi.VIP_NUMERO
                        JOIN photo p on vi.VIP_NUMERO=p.VIP_NUMERO
                        WHERE v.VIP_NOM='${nom}' and v.VIP_NUMERO=m.VIP_NUMERO and p.PHOTO_NUMERO=1`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.chanteCela = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT m.MAISONDISQUE_NOM, a.ALBUM_TITRE, a.ALBUM_DATE, ch.CHANTEUR_SPECIALITE
                        FROM vip v
                        JOIN chanteur ch on v.VIP_NUMERO=ch.VIP_NUMERO
                        JOIN composer co on ch.VIP_NUMERO=co.VIP_NUMERO
                        JOIN album a on co.ALBUM_NUMERO=a.ALBUM_NUMERO
                        JOIN maisondisque m on a.MAISONDISQUE_NUMERO=m.MAISONDISQUE_NUMERO
                        WHERE v.VIP_NOM like '${nom}'`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.aCousuCela = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT d.DEFILE_LIEU, d.DEFILE_DATE
                        FROM vip v
                        JOIN couturier c on v.VIP_NUMERO=c.VIP_NUMERO
                        JOIN defile d on c.VIP_NUMERO=d.VIP_NUMERO
                        WHERE v.VIP_NOM='${nom}'`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.aRealiseCela = function(nom, callback) {
    db.getConnection(function (err, connexion){
        if (!err) {
            let sql =`SELECT f.FILM_TITRE, f.FILM_DATEREALISATION
                        FROM film f
                        JOIN realisateur r on f.VIP_NUMERO=r.VIP_NUMERO
                        JOIN vip v on r.VIP_NUMERO=v.VIP_NUMERO
                        WHERE v.VIP_NOM='${nom}'`;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getVipsArticle = function (callback) {
// Information of all VIPS
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = `SELECT DISTINCT v.VIP_NUMERO, VIP_PRENOM, VIP_NOM FROM vip v
                 JOIN apoursujet aps ON v.VIP_NUMERO = aps.VIP_NUMERO
                 ORDER BY VIP_NOM`;
                 connexion.query(sql, callback);
                 connexion.release();
    }
  });
}

module.exports.getTargetArticle = function (idPerson, callback) {
  //
  db.getConnection(function functionName(err, connexion) {
    if(!err) {
      let sql = `SELECT v.VIP_NUMERO, v.VIP_NOM, v.VIP_PRENOM,ARTICLE_RESUME, ARTICLE_DATE_INSERT FROM vip v
                 JOIN apoursujet aps ON v.VIP_NUMERO = aps.VIP_NUMERO
                 JOIN article a ON aps.ARTiCLE_NUMERO = a.ARTICLE_NUMERO
                 JOIN exemplaire e ON a.EXEMPLAIRE_NUMERO = e.EXEMPLAIRE_NUMERO
                 WHERE v.VIP_NUMERO = \'`+ idPerson +`\' ;`;
                 console.log(sql);
                 connexion.query(sql, callback);
                 connexion.release();
    }
  });
}
