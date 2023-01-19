var express = require('express');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;
var session_dao = require('../models/dao/dataBase').session_dao;
var session = require('../models/session');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data1;
  sport_dao.findAll(function(err, rows) {
    if (err) console.log(err);
    else {
      data1 = rows;
      const data2 = data1.map(data1 => data1.nom_sport);
      res.render('form_create_session', {nom_sport: data2});
    }
  });
});

router.post('/', function(req, res, next) {
  var sport = req.body.sport;
  var type_session = req.body.typeAct;
  var idCon = req.body.IdCon;
  var mdp = req.body.mdpCon;

  console.log(type_session);
  
  session = new session();

  sport_dao.findByName(sport, function(err, rows) {
    if (err) console.log(err);
    else {
  
        session.init(null,"en cours",null,idCon,mdp,1/*valeur par défeaut en attente des autre groupes*/,type_session,rows[0].id_sport);

        session_dao.insert(session, function(err, rows) {
          if (err) console.log(err);
          else res.render('session');
        });
      }
  });
});


module.exports = router;