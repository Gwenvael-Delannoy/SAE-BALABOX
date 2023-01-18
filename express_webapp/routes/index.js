var express = require('express');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ message: '' });
});

router.post('/', function(req, res, next) {

  var ideCon= req.body.SIdentifiant;
  var password = req.body.Spwd;

   // Appeler la méthode de recherche de session
   
   var session = session_dao.FindByIdCon(ideCon, function(err, session) {;
       if (err) {
           res.render('index', { message: 'Identifiant ou mot de passe incorrect' });
       } else {
           if (session.mdp == password) {
               res.render('index', { message: 'Bienvenue' });
           } else {
               res.render('index', { message: 'Identifiant ou mot de passe incorrect' });
           }
       }
    });
  });
module.exports = router;
