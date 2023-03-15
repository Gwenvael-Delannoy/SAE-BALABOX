var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/dataBase').eleve_dao;

/* Recupere la page de classement des eleves et qui renvoie un tableau de string avec les prenoms des eleves */
router.get('/', function(req, res, next) {
    res.render('classement_eleve');
});


router.post('/', function(req, res, next) {
    res.render('eleve_contre_eleve');
});


module.exports = router;