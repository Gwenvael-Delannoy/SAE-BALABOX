var express = require('express');
var router = express.Router();


/* GET error page. */
router.get('/error', function(req, res, next) {
    const message = req.query.message;
    res.render('error', message);
  });

router.post('/', function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;
        
});
  module.exports = router;