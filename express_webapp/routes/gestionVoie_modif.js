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
                var voieModif=JSON.stringify(voie);
                res.render('gestionVoie_modification',{voie :voieModif , message : ""});
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
        var nom_voie = req.body.nomVoie;
        var deg_diffi = req.body.difficulté;

        var voie = new Voie();
        voie.init(nom_voie, deg_diffi);
        console.log(id_voie);

        voie_dao.update(id_voie,voie, function(err, voie){
            if (err) throw err;
            else{
                res.redirect('/gestion_voie?message=La voie a bien été modifiée');
            }
        });
    }
});
module.exports = router;