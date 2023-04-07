var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/dataBase').eleve_dao;
var match_dao = require('../models/dao/dataBase').match_dao;
var Eleve = require('../models/eleve');
var match = require('../models/match');

/* Recuperer la page de match entre deux eleves. */
router.get('/', function(req, res, next) {
    var idSession = req.query.idSession;
    var NomAdversaire = req.query.NomAdversaire;
    var idEleCo = req.query.idEleCo;
    res.render('eleve_contre_eleve', {idSession : idSession, NomAdversaire : NomAdversaire, idEleCo : idEleCo});
});

router.post('/', function(req, res, next) {
    score1 = req.body.score1;
    score2 = req.body.score2;
    idSession = req.body.idSession;
    NomAdversaire = req.body.NomAdversaire;
    idEleCo = req.body.idEleCo;
    console.log("Score 1 : " + score1);
    console.log("Score 2 : " + score2);
    console.log("idSession : " + idSession);
    console.log("NomAdversaire : " + NomAdversaire);
    console.log("idEleCo : " + idEleCo);



    
    res.render('eleve_contre_eleve',{idSession : idSession, NomAdversaire : NomAdversaire, idEleCo : idEleCo});
});

module.exports = router;