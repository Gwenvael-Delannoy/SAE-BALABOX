var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/dataBase').eleve_dao;

/* GET home page. */
router.get('/', function(req, res, next) {
        /**eleve_dao.findName(function(err, rows) {
      
        if (err) {
            console.log(err);
            res.render('error', {message: err});
        } else {
            console.log('Bonjour success');
            res.render('classement_eleve', {eleves:rows});
        }
    });*/res.render('classement_eleve');
});

module.exports = router;