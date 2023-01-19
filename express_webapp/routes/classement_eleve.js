var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/dataBase').eleve_dao;

/* GET home page. */
router.get('/', function(req, res, next) {
        var data1;
        eleve_dao.findName(function(err, rows) {
      
        if (err) {
            console.log(err);
            res.render('error', {message: err});
        } else {
            console.log(rows);
            data1 = rows;
            res.render('classement_eleve', {eleves:rows});
        }
    });
});

module.exports = router;