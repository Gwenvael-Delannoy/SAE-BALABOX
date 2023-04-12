var express = require('express');
var router = express.Router();
var sport_dao = require('../models/dao/dataBase').sport_dao;
var session_dao = require('../models/dao/dataBase').session_dao;
var session = require('../models/session');

var prof;
/* Recuperer la page de creation de session. */
router.get('/', function(req, res, next) {
  var data1;
  prof = req.query.prof;
  sport_dao.findAll(function(err, rows) {
    if (err) console.log(err);
    else {
      data1 = rows;

      data2 = data1.map(function (item) {
        return item.id_sport;
      });

      data3 = data1.map(function (item) {
        return item.nom_sport;
      });

      data4 = data1.map(function (item) {
        return item.type_session;
      });

      res.render('form_create_session', {id_sport: data2 ,nom_sport: data3 , type_session: data4});
    }
  });
});

router.post('/', function(req, res, next) {
  var selectedSport = req.body.selectedSport;
  var selectedType = req.body.selectedType;
  var login = req.body.IdCon;
  var password = req.body.mdpCon;
  
  var sess = new session();

  sport_dao.findByName(selectedSport, function(err, rows) {
    if (err) res.render('error', {message: err});
    else {
  
      var date = new Date();
      var date2 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      sess.init(date2,"en cours",null,login,password,prof/*valeur par défeaut en attente des autre groupes*/,rows[0].id_sport);

        session_dao.insert(sess, function(err, rows) {
          if (err) res.render('error', {message: err});
          else res.redirect('/listeSession?prof='+prof+'');
        });
      }
  });
});


module.exports = router;