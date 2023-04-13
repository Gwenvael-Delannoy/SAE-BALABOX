var express = require('express');
var router = express.Router();
var voie_dao = require('../models/dao/dataBase').voie_dao;
var Voie = require('../models/voie');


// Recuperer la page 
router.get('/', function(req, res, next) {
    var id_voie =req.query.id_voie;
    var voieModif;


    voie_dao.findByKey(id_voie, function(err, voie){
        if (err) throw err;
        else{
            if(voie == null || voie == undefined || voie.length == 0){
                res.redirect('/gestion_voie?message=La voie n\'existe pas');
            }
            else{
                voieModif = voie;
                var id_voie = voieModif[0].id_voie;
                var nom_voie = voieModif[0].nom_voie;
                var deg_diffi = voieModif[0].deg_diffi;
                res.render('gestionVoie_modification',{id_voie:id_voie, nom_voie :nom_voie , deg_diffi : deg_diffi, message : ""});
            }
        }
    });
});
router.post('/', function(req, res, next) {
    
    var id_voie = req.body.id_voie;

    if (req.body.action ==  'Retour' || req.body.action ==  'Annuler'){
        res.redirect('/gestion_voie');
    }
    else if (req.body.action ==  'Modifier'){
        var nom_voie = req.body.nom_voie;
        var deg_diffi = req.body.deg_diffi;

        var voie = new Voie();
        voie.init(nom_voie, deg_diffi);

        voie_dao.update(id_voie,voie, function(err, voie){
            if (err) throw err;
            else{
                res.redirect('/gestion_voie?message=La voie a bien été modifiée');
            }
        });
    }
});
module.exports = router;