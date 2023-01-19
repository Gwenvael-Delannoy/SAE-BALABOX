var express = require('express');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;
var eleve_dao =  require('../models/dao/dataBase').eleve_dao;
var eleve = require('../models/eleve');


/* GET home page. */
router.get('/', function(req, res, next) {
  var qui_est_connecte = process.env.whoami;
  var professeur ='';
  if(qui_est_connecte == 'professeur'){
    professeur = 'professeur';
  }
  res.render('index',{ message: '', professeur : professeur });
});

router.post('/', function(req, res, next) {

  var ideCon= req.body.SIdentifiant;
  var password = req.body.Spwd;
  var nomEleve = req.body.SNomEleve;
  var prenomEleve = req.body.SPrenomEleve;
  var classeEleve = req.body.SClasseEleve;
  var messageError = '';


  //savoir sur quel bouton on a cliqué en renvoyant le nom du bouton
  if(req.body.btn == 'BtConnexion'){
    
    // Appeler la méthode de recherche de session
    var session ;
    session_dao.FindByIdCon(ideCon, function(err,rows) {
      if (err == 'ER_NO_DB_ERROR') {
        console.log('Erreur de connexion à la base de données');
      }
      else if (err == 'ER_NO_SUCH_TABLE') {
        console.log('Erreur de connexion à la table');
      }
      else{
        session = rows;
        console.log(rows);
        if(session == null){
          messageError = 'Identifiant incorrect ou inexistant';
        }
        else{
          if(session.password == password){
            message = 'Connexion réussie';
    
            //en fonction de se qu'on recupere dans le process.env
    
            //si c'est un eleve
            // creer une object eleve et mettre les informations recupere dans le process.env
    
            //si c'est un professeur
            // ne fait rien car on a deja les informations dans la session
    
    
            //renvoie la page en fonction du type de session
            if(session.typeSession == 'tournoi equipe'){
              res.render('classement_equipe');
            }else if(session.typeSession == 'resultat'){
              res.render('resultat');
            }else if(session.typeSession == 'tournoi individuel'){
              res.render('classement_eleve');
            }
          }
          else{
            message = 'Mot de passe incorrect';
          }
          res.render('index', { message: messageError });
        }
        console.log('Bouton connexion cliqué');
        res.render('index', { message: messageError });
      }
    });
  }
  else if(req.body.btn == 'BtAccesProf'){
    res.render('session');
  }
});
module.exports = router;
