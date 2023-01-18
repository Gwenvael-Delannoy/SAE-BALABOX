var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/eleve_dao');

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = eleve_dao.findAll(function(err, rows, fields) {
      
        if (err) {
            console.log(err);
            res.render('error', {message: err.message, error: err});
        } else {
            res.render('classement_eleve', {title: 'Classement des élèves', eleves: rows});
        }
    });
});

module.exports = router;