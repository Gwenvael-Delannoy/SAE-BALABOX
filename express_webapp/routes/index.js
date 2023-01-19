var express = require('express');
var router = express.Router();
var session_dao =  require('../models/dao/dataBase').session_dao;
var eleve_dao =  require('../models/dao/dataBase').eleve_dao;
var eleve = require('../models/eleve');


/* GET home page. */
router.get('/', function(req, res, next) {
  var qui_est_connecte = process.env.whoami;
  var professeur ='zjz';
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
    
    session_dao.FindByIdCon(ideCon, function(err,rows) {
      if (err ) {
        messageError ='Connexion a la base de donnée impossible'
      }
      else{
        var session = rows;

        if(session == null){
          messageError = 'Identifiant incorrect ou inexistant';
        }
        else{
          if(session[0].mdp == password){
            messageError = 'Connexion réussie';    
            //en fonction de se qu'on recupere dans le process.env
    
            //si c'est un eleve
            // creer une object eleve et mettre les informations recupere dans le process.env
    
            //si c'est un professeur
            // ne fait rien car on a deja les informations dans la session
    
            //renvoie la page en fonction du type de session
            if(session[0].type_session == 'tournoi equipe'){
              res.redirect('/classement_equipe'+ session[0].id_session);
            }else if(session[0].type_session == 'resultat'){
              res.redirect('/resultat' + session[0].id_session);
            }else if(session[0].type_session == 'tournoi individuel' ){
              res.redirect('/classement_eleve' + session[0].id_session);
            }
          }
          else{
            messageError = 'Mot de passe incorrect';
            res.render('index', { message: messageError });
          }
        }
        console.log('Bouton connexion cliqué');
      }
    });
  }
  else if(req.body.btn == 'BtAccesProf'){
    res.redirect('/session');
  }
});
module.exports = router;
