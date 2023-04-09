var express = require('express');
var router = express.Router();

var id_session ='';
var type_sport ='';

/* Recuperer la page de tournoi de foot */ 
router.get('/', function(req, res, next) {
    id_session = req.query.idsession;
    type_sport = req.query.type;

  res.render('classement_prof',{type:type_sport});
});
router.post('/', function(req, res, next) {
    
    var sport ='';
    if(type_sport =='tournoi equipe'){
        sport = req.query.sport;
    }
    if (req.body.action ==  'Gestion des equipes'){
      res.redirect('/gestion_equipe?idsession='+req.body.idsession+'&type='+req.body.type);
    }
    else if (req.body.action ==  'Retour'){
      res.redirect('/listeSession');
    }
});

module.exports = router;