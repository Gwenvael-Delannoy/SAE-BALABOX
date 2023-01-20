var express = require('express');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;


/* GET home page. */
router.get('/', function(req, res, next) {
  session_dao.FindSessionProfSport("Raul Adrien",function(err,rows) {
    if (err ) {
      res.render("error", {message: err});
    }
    else{
      res.render('listeSession',{session : rows});
    }
  });
});

router.post('/', function(req, res, next) {

  var id = req.body.delete;

  session_dao.findByKey(id, function(err, row) {
    console.log();
    if(row[0].type_session== 'resultat'){
      session_dao.deleteResultat(id, function(err) {
        if (err) res.render("error", {message: err});
        else {
          console.log("delete");
          res.redirect('listeSession');
        }
      });

    } else {
      session_dao.deleteTournois(id, function(err) {
        if (err) res.render("error", {message: err});
        else {
          console.log("delete");
          res.redirect('listeSession');
        }
      });
    }
  });
});

module.exports = router;