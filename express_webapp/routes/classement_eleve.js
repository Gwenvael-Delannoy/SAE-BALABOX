var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/eleve_dao');

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = eleve_dao.findName(function(err, rows) {
      
        if (err) {
            console.log(err);
            res.render('error', {message: err});
        } else {
            res.render('classement_eleve', {eleves:rows});
        }
    });
});

module.exports = router;