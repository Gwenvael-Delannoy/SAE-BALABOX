var express = require('express');
var router = express.Router();

/* Recuperer la page de match entre deux eleves. */
router.get('/', function(req, res, next) {
    var idSession = req.query.idSession;
    var NomAdversaire = req.query.NomAdversaire;
    res.render('eleve_contre_eleve', {idSession : idSession, NomAdversaire : NomAdversaire});
});

router.post('/', function(req, res, next) {
    console.log(req.body.score1);
    res.render('eleve_contre_eleve');
});

module.exports = router;