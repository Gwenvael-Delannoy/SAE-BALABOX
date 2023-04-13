var express = require('express');
var router = express.Router();
var figure_dao = require('../models/dao/dataBase').figure_dao;
var Figure = require('../models/figure');


// Recuperer la page 
router.get('/', function(req, res, next) {
    
    var id_figure =req.query.id_figure;
    var figureModif;


    figure_dao.findByKey(id_figure, function(err, figure){
        if (err) throw err;
        else{
            if(figure == null || figure == undefined || figure.length == 0){
                res.redirect('/gestion_figure?message=La figure n\'existe pas');
            }
            else{
                figureModif =  figure[0];
                var nom = figureModif.nom;
                var desc = figureModif.description;
                var point = figureModif.point;
                var id_figure = figureModif.id_figure;
                res.render('gestionFigure_modification',{id_figure:id_figure , nom:nom , desc:desc, point : point, message : ""});
            }
        }
    });
});

router.post('/', function(req, res, next) {
    
    var id_figure = req.body.id_figure;

    if (req.body.action ==  'Retour' || req.body.action ==  'Annuler'){
        res.redirect('/gestion_figure');
    }
    else if (req.body.action ==  'Modifier'){
        var nom = req.body.nom_figure;
        var description = req.body.desc_figure;
        var point = req.body.point;

        var figure = new Figure();
        figure.init(nom,description, point);

        figure_dao.update(id_figure,figure, function(err, figure){
            if (err) throw err;
            else{
                res.redirect('/gestion_figure?message=La figure a bien été modifiée');
            }
        });
    }
});
module.exports = router;