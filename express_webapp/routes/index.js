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
  var messageError = '';

   // Appeler la méthode de recherche de session
   
   var session = session_dao.FindByIdCon(ideCon, function(err,rows) {
    if (err == 'ER_NO_DB_ERROR') {
      console.log('Erreur de connexion à la base de données');
    }
    else if (err == 'ER_NO_SUCH_TABLE') {
      console.log('Erreur de connexion à la table');
    }
  });
  if(session == null){
    messageError = 'Identifiant incorrect';
  }
  else{
    if(session.password == password){
      message = 'Connexion réussie';
    }
    else{
      message = 'Mot de passe incorrect';
    }
    res.render('index', { message: messageError });
  }
});
module.exports = router;
