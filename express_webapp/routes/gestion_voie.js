var express = require('express');
var router = express.Router();
var voie_dao = require('../models/dao/dataBase').voie_dao;
var Voie = require('../models/voie');


/* Recuperer la page de tournoi de foot */ 
router.get('/', function(req, res, next) {

    voie_dao.findAll(function(err, voies){
        if (err) throw err;
        else{
            res.render('gestion_voie',{voiesss : voies , message : ""});
        }
    });
});
router.post('/', function(req, res, next) {
    
    var id_voie = req.body.indexVoie;

    if (req.body.action ==  'Retour'){
        res.redirect('/listeSession');
    }
    else if (req.body.action ==  'Ajouter2'){
        var nom_voie = req.body.nomVoie;
        var deg_diffi = req.body.difficulté;

        var voie = new Voie();
        voie.init(nom_voie, deg_diffi);

        voie_dao.insert(voie, function(err, voie){
            if (err) throw err;
            else{
                voie_dao.findAll(function(err, voies){
                    if (err) throw err;
                    else{
                        res.render('gestion_voie',{voiesss : voies , message : "La voie a bien été ajoutée"});
                    }
                });
            }
        });
    }
    else if (req.body.action ==  'Modifier2'){
        var nom_voie = req.body.nomVoie;
        var deg_diffi = req.body.difficulté;

        var voie = new Voie();
        voie.init(nom_voie, deg_diffi);
        voie.id_voie = id_voie;

        voie_dao.update(voie, function(err, voie){
            if (err) throw err;
            else{
                voie_dao.findAll(function(err, voies){
                    if (err) throw err;
                    else{
                        res.render('gestion_voie',{voiesss : voies , message : "La voie a bien été modifiée"});
                    }
                });
            }
        });

    }
});
module.exports = router;