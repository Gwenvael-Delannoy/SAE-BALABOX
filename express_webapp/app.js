var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var classement = require('./routes/classement');
var resultat = require('./routes/resultat');


var app = express();
var expressWs = require('express-ws')(app);

expressWs.getWss().on('connection', function(ws) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', expressWs.getWss().clients);
});

app.listen(3001, function () {
  console.log('Ecoute port : 3001 ');
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/classement', classement);
app.use('/resultat', resultat);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// catch 404 and forward to error handlermy
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{message : err.message});
});

module.exports = app;
