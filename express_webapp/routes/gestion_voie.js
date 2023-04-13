var express = require('express');
var router = express.Router();
var voie_dao = require('../models/dao/dataBase').voie_dao;
var Voie = require('../models/voie');


// Recuperer la page
router.get('/', function(req, res, next) {
    var message = req.query.message;
    if (message == undefined){
        message = "";
    }
    voie_dao.findAll(function(err, voies){
        if (err) throw err;
        else{
            res.render('gestion_voie',{voies : voies , message : message});
        }
    });
});
router.post('/', function(req, res, next) {
    
    var id_voie =  req.body.id_voie;

    if (req.body.action ==  'Retour'){
        res.redirect('/listeSession');
    }
    else if (req.body.action ==  'Ajouter'){
        res.redirect('/gestionVoie_ajout');
    }
    else if (req.body.action ==  'Modifier'){
        res.redirect('/gestionVoie_modif?id_voie='+id_voie);
    }
}); 
module.exports = router;