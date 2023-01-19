var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/dataBase').eleve_dao;

/* GET home page. qui renvoie la page et donne un tableau de string avec les prenom des eleve */
router.get('/', function(req, res, next) {
        var data1;
        eleve_dao.findName(function(err, rows) {
      
          if (err) {
              console.log(err);
              res.render('error', {message: err});
          } else {
              console.log(rows);
              data1 = rows;
              const data2 = data1.map(data1 => data1.prenom);
              res.render('classement_eleve', {eleves: data2});
          }
      });
});


router.post('/', function(req, res, next) {
    render('classement_eleve');
});


module.exports = router;