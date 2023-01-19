var express = require('express');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;


/* GET home page. */
router.get('/', function(req, res, next) {
  session_dao.FindSessionProfSport("Jack rihiad" ,function(err,rows) {
    if (err ) {
      console.log(err);
    }
    else{
      console.log(rows);
      res.render('listeSession',{session : rows});
    }
  });
});

router.post('/', function(req, res, next) {
  
  res.render('classment_eleve');
  
  
});

module.exports = router;