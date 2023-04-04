var express = require('express');
var router = express.Router();

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
    console.log("Score 1 : " + score1);
    console.log("Score 2 : " + score2);
    console.log("idSession : " + idSession);
    console.log("NomAdversaire : " + NomAdversaire);

    
    res.render('eleve_contre_eleve',{idSession : idSession, NomAdversaire : NomAdversaire});
});

module.exports = router;