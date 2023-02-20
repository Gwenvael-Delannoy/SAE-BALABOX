var express = require('express');
var router = express.Router();

/* Recuperer la page de match entre deux eleves. */
router.get('/', function(req, res, next) {
    res.render('eleve_contre_eleve');
});

router.post('/', function(req, res, next) {
    console.log(req.body.score1);
    res.render('eleve_contre_eleve');
});

module.exports = router;