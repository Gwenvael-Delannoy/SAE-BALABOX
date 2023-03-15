var express = require('express');
var router = express.Router();
var eleve_dao = require('../models/dao/dataBase').eleve_dao;

/* Recupere la page de classement des eleves et qui renvoie un tableau de string avec les prenoms des eleves */
router.get('/', function(req, res, next) {
        var data1;
        var session = req.query.ses;
        eleve_dao.findName2(session,function(err, rows) {
      
          if (err) {
              console.log(err);
              res.render('error', {message: err});
          } else {

                /**const socket = new WebSocket('ws://localhost:3000/eleve');

                socket.addEventListener('open', function (event) {
                socket.send('classement');
                });

                socket.addEventListener('message', function (event) {
                console.log('Réponse du serveur : ' + event.data);
                });*/

              console.log(rows);
              data1 = rows;
              const data2 = data1.map(data1 => data1.prenom);
              res.render('classement_eleve', {eleves: data2});
          }
      });
});


router.post('/', function(req, res, next) {
    res.render('eleve_contre_eleve');
});


module.exports = router;