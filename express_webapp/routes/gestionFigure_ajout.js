var express = require('express');
var router = express.Router();
var figure_dao = require('../models/dao/dataBase').figure_dao;
var Figure = require('../models/figure');

// Recuperer la page 
router.get('/', function(req, res, next) {
    res.render('gestionFigure_ajout',{ message : ""});
});
router.post('/', function(req, res, next) {

    if (req.body.action ==  'Retour' || req.body.action ==  'Annuler'){
        res.redirect('/gestion_figure');
    }
    else if (req.body.action ==  'Ajouter'){
        var nom = req.body.nom;
        var description = req.body.description;
        var point = req.body.point;

        var figure = new Figure();
        figure.init(nom,description, point);

        figure_dao.insert(figure, function(err, figure){
            if (err) throw err;
            else{
                res.redirect('/gestion_figure?message=La figure a bien été ajoutée');
            }
        });
    }
});
module.exports = router;