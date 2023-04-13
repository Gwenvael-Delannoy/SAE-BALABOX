var express = require('express');
var router = express.Router();
var voie_dao = require('../models/dao/dataBase').voie_dao;
var Voie = require('../models/voie');


// Recuperer la page 
router.get('/', function(req, res, next) {
    res.render('gestionVoie_ajout',{ message : ""});
});
router.post('/', function(req, res, next) {

    if (req.body.action ==  'Retour' || req.body.action ==  'Annuler'){
        res.redirect('/gestion_voie');
    }
    else if (req.body.action ==  'Ajouter'){
        var nom_voie = req.body.nomVoie;
        var deg_diffi = req.body.difficulté;

        var voie = new Voie();
        voie.init(nom_voie, deg_diffi);

        voie_dao.insert(voie, function(err, voie){
            if (err) throw err;
            else{
                res.redirect('/gestion_voie?message=La voie a bien été ajoutée');
            }
        });
    }

});
module.exports = router;