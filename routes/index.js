var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login', { message: req.flash('loginMessage') }); 
});

/* POST login page */
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile', 
  failureRedirect : '/login', 
  failureFlash : true
}));

/* GET register page */
router.get('/register', function(req, res) {
  res.render('register', { message: req.flash('signupMessage') });
});

/* POST register page */
router.post('/register', passport.authenticate('local-register', {
  successRedirect : '/profile',
  failureRedirect : '/register',
  failureFlash : true
}));

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/profile',
  failureRedirect : '/'
}));

/* GET logout page */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

/* GET profile page. */
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {user : req.user});
});

/* GET logout page */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();

  res.redirect('/'); 
};

module.exports = router;