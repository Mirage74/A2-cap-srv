const getCaps = require('./controller.js').getCaps;
const getCapsByID = require('./controller.js').getCapsByID;
const postRegUser = require('./controller.js').postRegUser;
const postUpdateUser = require('./controller.js').postUpdateUser;
const postUserScore = require('./controller.js').postUserScore;
const postLogin = require('../../config-passport.js').postLogin;
const passport = require('passport');
const getLoginFacebook = require('../../config-passport.js').getLoginFacebook;
const path = require('path');
//const getLoginFB_CB = require('../../config-passport.js').getLoginFB_CB;



const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

exports.capsRoutes = (router) => {
    router.get('/get', getCaps);
    router.get('/get/:id', getCapsByID);
    router.post('/createUser', postRegUser);
    router.post('/updateUser', postUpdateUser);
    router.post('/userScore', postUserScore);
    router.post('/login', postLogin);

    router.get('/loginFacebook', getLoginFacebook);
    //router.get('/facebook/callback', getLoginFB_CB);

   router.get('/', (req, res) => {
    res.render('pages/index.ejs'); // load the index.ejs file
    // res.json({
    //   __dirname
    // })
  });

  router.get('/privacy', (req, res) => {
    res.render('pages/privacypolicy.ejs'); 
  });
  
  router.get('/profile', isLoggedIn, function (req, res) {
    console.log("router.get('/profile req.user ", req.user)
    res.render('pages/profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
    //return res.json({user : req.user});
  });
  
  router.get('/error', isLoggedIn, function (req, res) {
    res.render('pages/error.ejs');
  });
  
//   router.get('/loginFacebook', passport.authenticate('facebook',
//   ));
  
  router.get('/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/api/profile',
      failureRedirect: '/api/error'
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        return res.json({user : req.user});
    }
    );
  
  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
   
}


