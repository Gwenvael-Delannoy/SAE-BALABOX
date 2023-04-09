var express = require('express');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;
var session_dao = require('../models/dao/dataBase').session_dao;
var session = require('../models/session');

var prof;
var id;
/* Recuperer la page de creation de session. */
router.get('/', function(req, res, next) {
  var data1;
  prof = req.query.prof;
  id = req.query.idSession;

  session_dao.FindSessionSportById(id,function(err, rows) {
    if (err) console.log(err);
    else {

      data1 = rows;

      var nom_sport = data1.map(function (item) {
        return item.nom_sport;
      });

      var type_session = data1.map(function (item) {
        return item.type_session;
      });

      var identifiant_con = data1.map(function (item) {
        return item.identifiant_con;
      });

      var mdp = data1.map(function (item) {
        return item.mdp;
      });

      res.render('updateSession', {nom_sport: nom_sport , type_session: type_session, login: identifiant_con, mdp: mdp});
    }
  });
});

router.post('/', function(req, res, next) {
  var login = req.body.IdCon;
  var password = req.body.mdpCon;
  
  var sess = new session();

  session_dao.FindSessionSportById(id, function(err, rows) {
    if (err) res.render('error', {message: err});
    else {
  
      sess.init(null,"en cours",null,login,password,prof/*valeur par défeaut en attente des autre groupes*/,rows[0].id_sport);

        session_dao.update(id, sess, function(err, rows) {
          if (err) res.render('error', {message: err});
          else res.redirect('listeSession');
        });
      }
  });
});


module.exports = router;