var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var match_dao = require('../models/dao/dataBase').match_dao;
var Eleve = require('../models/eleve');
var matchSession = [];

/* Recupere la page de classement des eleves et qui renvoie un tableau de string avec les prenoms des eleves */
router.get('/', function(req, res, next) {
    idSession = req.query.ses;

    match_dao.findAllMatchSes(idSession, function(err,rows) {
        if (err ) {
            messageError ='Connexion à la base de donnée impossible';
            res.render('error',{message : messageError});
        }
        else{
            matchSession = rows;
            console.log("match :" +matchSession);
        }
    });


    eleve_dao.findName4(idSession, function(err,rows) {
        if (err ) {
            messageError ='Connexion à la base de donnée impossible';
        }
        else{
            var classement = rows;
            console.log("tableau :" +classement);

            res.render('classement_eleve', { idSession : idSession, classement : classement});
        }
    });

});


router.post('/', function(req, res, next) {
    res.render('eleve_contre_eleve');
});


module.exports = router;