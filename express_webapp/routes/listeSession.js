var express = require('express');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;


/* GET home page. */
router.get('/', function(req, res, next) {
  session_dao.FindSessionProfSport("Jack rihiad" ,function(err,rows) {
    if (err ) {
      res.render(err);
    }
    else{
      res.render('listeSession',{session : rows});
    }
  });
});

router.post('/', function(req, res, next) {

  var id = req.body.delete;

  session_dao.deleteAll(id, function(err, rows) {
    if (err) res.render(err);
    else {
      console.log("delete");
      res.redirect('listeSession');
    }
  });
  
  
  

});

module.exports = router;