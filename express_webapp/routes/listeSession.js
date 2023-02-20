var express = require('express');
const session = require('express-session');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;


/* Recuperer la page qui liste toutes les session créer par le professeur connecté . */
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
  if(req.body.action == 'add') {
    res.redirect('crSession');

  }

  var id = req.body.id;
  console.log(id);

  session_dao.findByKey(id, function(err, row) {
    if (err) res.render("error", {message: err});
    else {
      var id_sport = row[0].le_sport;

      if(req.body.action == 'update') {
        res.redirect('crSession');
    
      } else if(req.body.action == 'view') {
        res.redirect('/resultat?ses='+id+'&idSport='+id_sport+'');
    
      } else {
        
        res.redirect('listeSession');
      }
    }
  });
});

module.exports = router;