var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var multer = require('multer');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var messageRouter = require('./routes/message');
var jobResultsRouter = require('./routes/jobResults');
var jobSeekerResultsRouter = require('./routes/jobSeekerResults');
var companyDetailsRouter = require('./routes/companyDetails');
var personDetailsRouter = require('./routes/personDetails');
var postJobsRouter = require('./routes/postJobs');
var jobRequestsRouter = require('./routes/jobRequests');
var userDetailsRouter = require('./routes/userDetails');
var jobDetailsRouter = require('./routes/jobDetails');
var requestDetailsRouter = require('./routes/requestDetails');
var findCvsRouter = require('./routes/findCvs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// use session to store user info
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
  cookie:{
      expires: 600000,
  }
}));

app.use(function (req,res,next) {
    res.locals.session=req.session;
    next();
});


//set url of each route
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/message',messageRouter);
app.use('/jobResults',jobResultsRouter);
app.use('/jobSeekerResults',jobSeekerResultsRouter);
app.use('/companyDetails',companyDetailsRouter);
app.use('/personDetails',personDetailsRouter);
app.use('/postJobs',postJobsRouter);
app.use('/jobRequests',jobRequestsRouter);
app.use('/userDetails',userDetailsRouter);
app.use('/jobDetails',jobDetailsRouter);
app.use('/requestDetails',requestDetailsRouter);
app.use('/findCvs',findCvsRouter);



// catch 404 and forward to error handler
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
  res.render('error');
});


module.exports = app;
