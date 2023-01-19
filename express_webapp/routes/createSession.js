var express = require('express');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;

/* GET home page. */
router.get('/', function(req, res, next) {
  var data1;
  sport_dao.findAll(function(err, rows) {
    if (err) console.log(err);
    else {
      data1 = rows;
      const data2 = data1.map(data1 => data1.nom_sport);
      res.render('form_create_session', {nom_sport: data2});
    }
  });
});

module.exports = router;